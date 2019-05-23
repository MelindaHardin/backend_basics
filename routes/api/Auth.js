//to login users already registered 
const router = require("express").Router();
const auth= require ('../../middleware/auth');
const User = require ('../../models/User');
const { check, validationResult } = require ('express-validator/check');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const config = require ('config')

// @route   GET api/auth
// @desc    Test route
// @access  Public

router.get('/', auth, async (req, res) =>{

  try{
    const user = await User.findById(req.user.id).select ('-password');
    res.json(user);
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }

});

router.post('/',[
  check ('email', 'Please enter a valid email address').isEmail(),
  check('password', 'Password required').exists()
],
 async (req, res) =>{
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
  }

  const{ email, password} = req.body;
     
  try{
      //See if user exists already send back an error
    let user = await User.findOne({ email: email });
    if(!user){
      res.status(400).json({ errors: [ { msg: 'Invalid credentials'}]});
    }

    isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      res.status(400).json({ errors: [ { msg: 'Invalid credentials'}]});
    }

    const payload={
      user:{
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'),
    { expiresIn: 360000}, (err, token)=>{
      if(err) throw err;
      res.json({token});
    })

  } catch(err){
    console.log(err.message);
    res.status(500).send('Server error')
  }
  

})



module.exports = router;