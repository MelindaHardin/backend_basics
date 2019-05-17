const router = require("express").Router();

// @route GET api/users
// @desc Test route
// @ access Public (no token required using auth. middleware)

router.get('/', (req, res) =>
  res.send("This is the USERS Route")
);

module.exports = router;