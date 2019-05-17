const router = require("express").Router();

// @route GET api/authentication
// @desc Test route
// @ access Public (no token required using auth. middleware)

router.get('/', (req, res) =>
  res.send("This is the AUTHENTICATION Route")
);

module.exports = router;