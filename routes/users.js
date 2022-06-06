const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hej, this is from user routes");
});

router.get("/man", (req, res) => {
  res.send("Hej man!");
});

module.exports = router;
