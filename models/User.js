//To create new users.

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  }, 
  email:{
    type: String, 
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"], 
    unique: true
  }, 
  password: {
    type: String, 
    required: true
  },
  date: {
    type: Date, 
    default: Date.now 
  }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("user", UserSchema);

// Export the model
module.exports = User;
