const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    //links to the 'user' collection by a user's id.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  address: { 
    type: String,
    trim: true,
    required: true
  },
  addressII: { 
    type: String
  },
  city: { 
    type: String,
    trim: true,
    required: true
  },
  state: { 
    type: String,
    trim: true,
    required: true
  },
  zip: { 
    type: String,
    trim: true,
    required: true
  },
  phone: { 
    type: String,
    required: true
  },
  phoneII: { 
    type: String
  },
  dob: { 
    type: Date
  },
  gender:{
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// This creates our model from the above schema, using mongoose's model method
var Profile = mongoose.model("profile", ProfileSchema);

// Export the model
module.exports = Profile;