const { getAllContacts, getContactById } = require("../models/contacts");

async function sendAllContacts(req, res) {
  try {
    // Attempt to fetch all contacts
    const contacts = await getAllContacts();
    // Check if contacts were found
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }
    // Respond with the contacts
    res.status(200).json({ result: contacts });
  } catch (error) {
    // Handle any error that occurred during the process
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function sendSingleContact(req, res) {
  try {
    const id = req.params.ID;
    const contact = await getContactById(id);
    if (!contact) {
      return res
        .status(404)
        .json({ message: `No contacts found with the ID ${id}` });
    }
    res.status(200).json({ result: contact });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { sendAllContacts, sendSingleContact };
