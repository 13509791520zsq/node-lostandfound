const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required:true
  },
  email:{
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  identity:{
    type: String,
    default: 'user'
  }
  
})
module.exports = User = mongoose.model('users',userSchema)