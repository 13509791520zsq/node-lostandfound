const mongoose = require('mongoose')
const Schema = mongoose.Schema

const letterSchema = new Schema({
  title:{
    required: true,
    type: String
  },
  body:{
    required: true,
    type: String
  },
  userid: {
    required: true,
    type: String
  },
  data: {
    type: Date,
    default: new Date()
  },
  thumbsup: {
    type: Number,
    default: 0
  }
})

module.exports = Letter = mongoose.model('letters',letterSchema)
