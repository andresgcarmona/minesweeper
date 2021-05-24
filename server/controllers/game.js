const Game = require('../models/game')
const {
        generateBoard,
        revealNeighbors,
      }    = require('../utils/game')

const gameController = {
  index (req, res) {
    res.send('It works!')
  },
  
  /**
   * This function will create a new game, save it in the database and
   * return the newly created game information, including its id and board
   * generated server side.
   *
   * @param req
   * @param res
   */
  async create (req, res) {
    const {
            difficulty,
            numMines,
            rows,
            cols,
            userId,
          } = req.body
    
    try {
      const board = generateBoard(parseInt(cols), parseInt(rows),
        parseInt(numMines))
      
      // Update other game's states.
      await Game.updateMany({
        user: userId,
        state: { $ne: 'lost' },
      }, {
        $set: { state: 'paused' },
      })
      
      const game = new Game({
        user: userId,
        boardSize: [parseInt(rows), parseInt(cols)],
        mines: parseInt(numMines),
        elapsedTime: 0,
        difficulty,
        board,
        state: 'new',
      })
      
      const newGame = await game.save()
      await newGame.populate('user').execPopulate()
      
      // Get user's games.
      const games = await Game.find({
        user: userId,
      })
      
      res.status(201).json({
        game: newGame,
        games,
      })
    } catch (err) {
      res.status(400).json({
        message: err.message,
        err: JSON.stringify(err),
      })
    }
  },
  
  /**
   * Mark a cell as revealed.
   *
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async checkCell (req, res) {
    const {
            row,
            col,
            id,
          } = req.body
    
    try {
      // Get cel from board array.
      let cell = null
      let r, index
      
      for (r = 0; r < res.game.board.length; r++) {
        cell = res.game.board[r].find((item, i) => {
          if (item.row === parseInt(row) && item.col === parseInt(col)) {
            index = i
            return true
          }
        })
        
        if (cell) break
      }
      
      if (cell) {
        // Set cell as revealed.
        cell.revealed = true
        
        // Create a copy of the board.
        const board = [...res.game.board]
        board[r].splice(index, 1, cell)
        
        revealNeighbors(cell.row, cell.col, board)
        
        await Game.updateOne({
          _id: id,
        }, {
          '$set': {
            board: board,
            state: cell.isMine ? 'lost' : 'playing',
          },
        }).then(async response => {
          const game  = await Game.findById(id)
          const games = await Game.find({
            user: game.user,
          })
          
          res.json({ game, games })
        }).catch(err => {
          res.json({
            message: err.message,
          })
        })
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
      })
    }
  },
  
  async markAsLost (req, res) {
    const board = [...res.game.board]
    
    const {
            id,
          } = req.body
    
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].revealed = true
      }
    }
    
    try {
      await Game.updateOne({
        _id: id,
      }, {
        '$set': {
          board: board,
        },
      }).then(async response => {
        const game  = await Game.findById(id)
        const games = await Game.find({
          user: game.user,
        })
        
        res.json({
          game,
          games,
        })
      }).catch(err => {
        res.json({
          message: err.message,
        })
      })
    } catch (err) {
      res.status(500).send({
        message: err.message,
      })
    }
  },
  
  async playGame (req, res) {
    const { userId } = req.body
    
    try {
      // Set all others games that are in course as paused.
      await Game.updateMany({
        _id: { $ne: res.game._id },
        state: { $ne: 'lost' },
      }, {
        state: 'paused',
      })
  
      res.game.state = 'playing'
      await res.game.save()
      
      const games = await Game.find({
        user: userId,
      })
      
      res.send({
        game: res.game,
        games,
      })
    } catch (err) {
      res.status(500).send({
        message: err.message,
      })
    }
  },
}

module.exports = gameController
