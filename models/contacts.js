const { getClient } = require("../models/connectDB");
const { ObjectId } = require("mongodb"); // Make sure to require ObjectId

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

async function getContactById(id) {
  try {
    const client = getClient(); // Get the MongoDB client
    const database = client.db("cse-341-project1");
    const collection = database.collection("contacts");

    // Convert the id to an ObjectId if it's a valid string
    const contact = await collection.findOne({ _id: new ObjectId(id) });

    return contact;
  } catch (error) {
    console.error(`Failed to retrieve contact with id ${id}:`, error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

module.exports = { getAllContacts, getContactById };
