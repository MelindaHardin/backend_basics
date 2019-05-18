const router = require("express").Router();
const { check, validationResult } = require('express-validator/check');


// @route GET api/users
// @desc Test route
// @ access Public (no token required using auth. middleware)

router.post('/',[
  check('name', 'Name is required.').not().isEmpty(),
  check ('email', 'Please enter a valid email address').isEmail(),
  check('password', 'Please enter a password with six or more characters').isLength({ min: 6 })
],
 (req, res) =>{
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
  }
  res.send("This is the User Route")
})


module.exports = router;