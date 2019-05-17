const mongoose = require('mongoose');

const UserSchema = new mongoose.Scheema({
  name: {
    type: String, 
    required: true
  }, 
  email:{
    type: String, 
    required: true, 
    unique: true
  }, 
  password: {
    type: String, 
    required: yes
  },
  case_nuber:{
    type: String, 
    required: yes
  },
  date: {
    type: Date, 
    default: Date.now 
  }
})

module.exports = User ('user', UserSchema);