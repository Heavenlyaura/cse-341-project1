const express = require("express");
const router = express.Router();
const { sendAllContacts } = require("../controllers/index");

router.get("/all", sendAllContacts);

module.exports = router;
