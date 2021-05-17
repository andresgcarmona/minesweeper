const Game = require('../models/game')
const { generateBoard } = require('../utils/game')
const { gameConfig } = require('../config/config')

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
    const { difficulty } = req.body
    const config         = gameConfig[difficulty]
    
    try {
      const cols = config.boardSize[0]
      const rows = config.boardSize[1]
      
      const board = generateBoard(cols, rows)
      
      const game = new Game({
        boardSize: config.boardSize,
        mines: config.numMines,
        elapsedTime: 0,
        difficulty,
        board,
        state: 'new',
      })
      
      const newGame = await game.save()
      //newGame.board = []
  
      res.status(201).json(newGame)
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
      let cell, game = null
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
        
        await Game.updateOne({
          _id: id
        }, {
          '$set': {
            board: board
          }
        }).then(async response => {
          const game = await Game.findById(id)
          //game.board = []
          
          res.json(game)
        }).catch(err => {
          res.json({
            message: err.message
          })
        })
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = gameController
