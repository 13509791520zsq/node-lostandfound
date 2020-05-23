const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fitemSchema = new Schema({
  itemname: {
    type: String,
    required: true
  },
  place: {
    type: String,
  },
  date: {
    type: Date
  },
  image: {
    type: String
  },
  sketch: {
    type: String
  },
  userid:{
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
})
module.exports = Fitem = mongoose.model('fitems',fitemSchema)