const router = require("express").Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require ('express-validator/check');

const Profile = require ("../../models/Profile");
const User = require ("../../models/User");

// @route   GET api/profile/self
// @desc    Test route
// @access  Private

router.get('/self', auth, async (req, res) => {

  try{
    const profile = await Profile.findOne({ user: req.user.id }).populate ([ 'user',
      'name']);

     if(!profile){
       return res.status(400).json ({ msg: "There is no profile for this user" })
     } res.json(profile);
  }catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }

});

// @route   POST api/profile
// @desc    Create or update a user profile
// @access  Private

router.post('/', [ auth, [
  
  check('address', "A home address is required.").not().isEmpty(),
  check('phone', 'A phone number is required').not().isEmpty()

] ], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
  }//Pull out all the information from the req.body...
  
  const{
    address, 
    addressII,
    city,
    state,
    zip,
    phone,
    phoneII, 
    dob,
    gender
  } = req.body;

  // ...and check to make sure they were added before submitting to the database. 
  const profileFields={};

  profileFields.user = req.user.id;
  if(address)profileFields.address = address; 
  if(addressII)profileFields.addressII = addressII;
  if(city)profileFields.city = city;
  if(state)profileFields.state = state;
  if(zip)profileFields.zip = zip;
  if(phone)profileFields.phone = phone;
  if(phoneII)profileFields.phoneII = phoneII;
  if(dob)profileFields.dob = dob;
  if(gender)profileFields.gender = gender;

  try{
    //console.log(profileFields);
    let profile = await Profile.findOne({ user: req.user.id });

    if(profile){
      //if ther IS a profile found, update it.
      profile = await Profile.findOneAndUpdate (
        { user: req.user.id },
        {$set: profileFields},
        { new: true });
        return res.json(profile);
    }
    profile = new Profile (profileFields);
    await profile.save();
    res.json (profile);

  }catch(err){
    console.error(err.message);
    res.status(500).send ('server error');
  }
});

module.exports = router;