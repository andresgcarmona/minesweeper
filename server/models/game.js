const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const gameSchema = new Schema({
  id: ObjectId,
  difficulty: String,
  boardSize: Array,
  numMines: Number,
  board: Array,
})

module.exports = mongoose.model('games', gameSchema)
