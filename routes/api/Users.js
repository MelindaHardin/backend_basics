const router = require("express").Router();


// @route GET api/users
// @desc Test route
// @ access Public (no token required using auth. middleware)

router.post('/', (req, res) =>{
  console.log (req.body);
  res.send("This is the User Route")
})


module.exports = router;