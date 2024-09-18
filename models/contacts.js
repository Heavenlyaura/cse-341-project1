const { getClient } = require("../models/connectDB");

async function getAllContacts() {
  try {
    // Get the database client
    const client = getClient();
    const database = client.db("cse-341-project1");
    const collection = database.collection("contacts");

    // Fetch all documents from the collection
    const contacts = await collection.find({}).toArray();

    // Return the fetched contacts
    return contacts;
  } catch (error) {
    console.error("Failed to retrieve contacts:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

module.exports = { getAllContacts };
