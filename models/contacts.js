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

async function createUser(
  firstName,
  lastName,
  email,
  favouriteColor,
  birthDay
) {
  try {
    const client = await getClient();
    const database = client.db("cse-341-project1");
    const collection = database.collection("contacts");
    const newUser = {
      firstName,
      lastName,
      email,
      favouriteColor,
      birthDay,
    };
    const result = await collection.insertOne(newUser);
    return result.insertedId;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Unable to create user");
  }
}

async function updateUser(
  id,
  { firstName, lastName, email, favouriteColor, birthDay }
) {
  try {
    const client = await getClient();
    const database = client.db("cse-341-project1");
    const collection = database.collection("contacts");
    // Find the user by ID and update their details
    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, // Find user by their MongoDB ObjectId
      {
        $set: {
          firstName,
          lastName,
          email,
          favouriteColor,
          birthDay,
        },
      }
    );
    // Check if the update was successful
    if (result.matchedCount === 0) {
      throw new Error("User not found");
    }
    return result; // Return the result of the update operation
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Unable to update user");
  }
}

async function deleteUser(id) {
  try {
    const client = await getClient();
    const database = client.db("cse-341-project1");
    const collection = database.collection("contacts");
    // Attempt to delete the user by their ID
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    // `result` contains information about how many documents were deleted
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting user"); // Let the caller handle the error
  }
}

module.exports = deleteUser;

module.exports = {
  getAllContacts,
  getContactById,
  createUser,
  updateUser,
  deleteUser,
};
