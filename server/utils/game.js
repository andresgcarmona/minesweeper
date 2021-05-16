const { gameConfig } = require('../config/config')
const Cell = require('./cell')

function makeArray (cols, rows) {
  let arr = new Array(cols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
  }
  
  return arr
}

function generateBoard (difficulty = 'beginner') {
  const config = gameConfig[difficulty]
  const cols   = config.boardSize[0]
  const rows   = config.boardSize[1]
  
  let board = makeArray(cols, rows)
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < config.boardSize[1]; j++) {
      board[i][j] = new Cell()
    }
  }
  
  return board
}

module.exports = {
  generateBoard,
}
