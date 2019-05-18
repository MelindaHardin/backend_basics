const router = require ("express").Router();
const { check, validationResult } = require ('express-validator/check');
const bcrypt = require ('bcryptjs');
const User = require ('../../models/User');

// @route GET api/users
// @desc Test route
// @ access Public (no token required using auth. middleware)

router.post('/',[
  check('name', 'Name is required.').not().isEmpty(),
  check ('email', 'Please enter a valid email address').isEmail(),
  check('password', 'Please enter a password with six or more characters').isLength({ min: 6 })
],
 async (req, res) =>{
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
  }

  const{ name, email, password} = req.body;
     
  try{
      //See if user exists already send back an error
    let user = await User.findOne({ email })
    if(user){
      res.status(400).json({ errors: [ { msg: 'User already exists'}]});
    };
      //if user does NOT exist create instance where a new user can be created in database when called.
    user = new User ({
      name,
      email, 
      password
    });

      //encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save()  //saves user to database 

    res.send("This is the User Route")

  } catch(err){
    console.log(err.message);
    res.status(500).send('Server error')
  }
  

})


module.exports = router;