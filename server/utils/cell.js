class Cell {
  constructor (row, col) {
    this.revealed = false
    this.isMine   = false
    this.row      = row
    this.col      = col
  }
}

module.exports = Cell
