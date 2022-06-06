const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hej, this is from auth routes");
});

module.exports = router;
