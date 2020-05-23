const mongoose = require('mongoose')
const Schema = mongoose.Schema

const litemSchema = new Schema({
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
module.exports = Litem = mongoose.model('litem',litemSchema)