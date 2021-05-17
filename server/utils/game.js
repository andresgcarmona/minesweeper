const Cell = require('./cell')
const Game = require('../models/game')

const makeArray = (cols, rows) => {
  let arr = new Array(cols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
  }
  
  return arr
}

const generateBoard = (rows, cols) => {
  let board = makeArray(rows,  cols)
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      board[i][j] = new Cell(i, j)
    }
  }
  
  return board
}

/**
 * Middleware function to get a game by id.
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const getGameById = async(req, res, next) => {
  try {
    const game = await Game.findById(req.body.id)
    
    if (!game) {
      res.status(404).json({
        message: `Game with id ${req.body.id} was not found on the server.`,
      })
    }
    
    res.game = game
    
    next()
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

module.exports = {
  generateBoard,
  getGameById,
  makeArray,
}
