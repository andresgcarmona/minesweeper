const Cell = require('./cell')
const Game = require('../models/game')

const makeArray = (cols, rows) => {
  let arr = new Array(cols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
  }
  
  return arr
}

const countNeighbors = (board, rows, cols) => {
  for(let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // If current cell is a mine, then don't count the neighbors.
      if (board[i][j].isMine) continue
      
      for (let n = -1; n <= 1; n++) {
        // Calculate and validate col position
        const col = i + n
        if(col < 0 || col >= cols) continue
        
        for (let k = -1; k <= 1; k++) {
          // Calculate and validate row position
          const row = j + k
          if (row < 0 || row >= rows) continue
          
          if (board[col][row].isMine) {
            board[i][j].neighborCount++
          }
        }
      }
    }
  }
  
  return board
}

const generateBoard = (rows, cols) => {
  let board = makeArray(rows,  cols)
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      board[i][j] = new Cell(i, j)
    }
  }
  
  board = countNeighbors(board, rows, cols)
  
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
