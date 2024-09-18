const express = require("express");
const router = express.Router();

router.get("/all", (req, res) => {
  res.send("Hello Worsdld!");
});

module.exports = router;
