const express = require("express");
const router = express.Router();
const { sendAllContacts, sendSingleContact } = require("../controllers/index");

router.get("/contact", sendAllContacts);
router.get("/contact/:ID", sendSingleContact);

module.exports = router;
