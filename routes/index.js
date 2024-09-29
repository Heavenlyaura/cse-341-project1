const express = require("express");
const router = express.Router();
const {
  sendAllContacts,
  sendSingleContact,
  createUserInfo,
  updateContactInfo,
  deleteContactInfo,
} = require("../controllers/index");

router.get("/", (req, res) => {
  //#swagger.tags=["Assignment Submission"]
  res.send("Assignment Submission");
});

router.use("/", require("./swagger"));

/* ************************************
  GET ROUTES 
 ************************************** */
router.get("/contact", sendAllContacts);
router.get("/contact/:ID", sendSingleContact);

/* ************************************
  POST ROUTES 
 ************************************** */
router.post("/contact", createUserInfo);

/* ************************************
  PUT ROUTES 
 ************************************** */
router.put("/contact/:ID", updateContactInfo);

/* ************************************
  DELETE ROUTES 
 ************************************** */
router.delete("/contact/:ID", deleteContactInfo);

module.exports = router;
