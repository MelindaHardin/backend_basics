const router = require("express").Router();

// @route GET api/profile
// @desc Test route
// @ access Public (no token required using auth. middleware)

router.get('/', (req, res) =>
  res.send("This is the PROFILE route")
);

module.exports = router;