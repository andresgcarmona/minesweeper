const Cell = require('./cell')

function makeArray (cols, rows) {
  let arr = new Array(cols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
  }
  
  return arr
}

function generateBoard (rows, cols) {
  let board = makeArray(rows,  cols)
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      board[i][j] = new Cell(i, j)
    }
  }
  
  return board
}

module.exports = {
  generateBoard,
}
