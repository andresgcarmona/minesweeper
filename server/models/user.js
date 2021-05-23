const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const uuid     = require('node-uuid')

const userSchema = new Schema({
  id: ObjectId,
  uuid: {
    type: String,
    default: uuid.v1(),
  },
  games: [
    {
      type: ObjectId,
      ref: 'Game'
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
