const { getAllContacts } = require("../models/contacts");

async function sendAllContacts(req, res) {
  const contacts = await getAllContacts();
  console.log(contacts)
  if (!contacts) {
    return res.status(404).json({ message: "Contacts not found" });
  }
  res.status(200).json(contacts);
}

module.exports = { sendAllContacts };
