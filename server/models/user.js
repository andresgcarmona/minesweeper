import mongoose from 'mongoose'
import uuid from 'node-uuid'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new Schema({
  id: ObjectId,
  uuid: {
    type: String,
    default: uuid.v1(),
  },
  games: [
    {
      type: ObjectId,
      ref: 'Game',
    },
  ],
}, {
  timestamps: true,
})

export default mongoose.model('User', userSchema)
