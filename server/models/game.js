const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const gameSchema = new Schema({
  id: ObjectId,
  user: {
    type: ObjectId,
    ref: 'User',
  },
  difficulty: String,
  boardSize: Array,
  mines: Number,
  board: Array,
  elapsedTime: Number,
  state: String,
}, {
  timestamps: true,
})

module.exports = mongoose.model('Game', gameSchema)
