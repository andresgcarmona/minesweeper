const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const gameSchema = new Schema({
  id: ObjectId,
  difficulty: String,
  boardSize: Array,
  mines: Number,
  board: Array,
  elapsedTime: Number,
})

module.exports = mongoose.model('minesweeper', gameSchema)
