class Cell {
  constructor (row, col) {
    this.revealed = false
    this.isMine   = Math.floor(1 + Math.random() * 2) === 2
    this.row      = row
    this.col      = col
  }
}

module.exports = Cell
