class Cell {
  constructor (row, col, board) {
    this.revealed = false
    this.isMine   = Math.floor(1 + Math.random() * 2) === 2
    this.row      = row
    this.col      = col
    
    this.neighborCount = 0
  }
}

module.exports = Cell
