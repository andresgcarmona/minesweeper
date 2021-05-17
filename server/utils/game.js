const Cell = require('./cell')

function makeArray (cols, rows) {
  let arr = new Array(cols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
  }
  
  return arr
}

function generateBoard (cols, rows) {
  let board = makeArray(cols, rows)
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = new Cell()
    }
  }
  
  return board
}

module.exports = {
  generateBoard,
}
