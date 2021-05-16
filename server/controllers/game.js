const Game              = require('../models/game')
const { generateBoard } = require('../utils/game')

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
  create (req, res) {
    const { difficulty } = req.body
    
    try {
      const board = generateBoard(difficulty)
      
      res.json({
        game: {
          board,
        },
      })
    } catch (err) {
      res.status(400).json({
        message: err.message,
      })
    }
  },
}

module.exports = gameController
