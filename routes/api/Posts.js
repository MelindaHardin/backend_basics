const router = require("express").Router();

// @route GET api/posts
// @desc Test route
// @ access Public (no token required using auth. middleware)

router.get('/', (req, res) =>
  res.send("This is the POSTS route")
);

module.exports = router;