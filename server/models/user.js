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
})

module.exports = mongoose.model('user', userSchema)
