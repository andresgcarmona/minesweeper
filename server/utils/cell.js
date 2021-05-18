class Cell {
  constructor (row, col, isMine = false) {
    this.revealed = false
    this.isMine   = isMine
    this.row      = row
    this.col      = col
    
    this.neighborCount = 0
  }
}

module.exports = Cell
