const Game              = require('../models/game')
const { generateBoard } = require('../utils/game')
const { gameConfig }    = require('../config/config')

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
      
      res.status(201).json(newGame)
    } catch (err) {
      res.status(400).json({
        message: err.message,
        err: JSON.stringify(err),
      })
    }
  },
}

module.exports = gameController
