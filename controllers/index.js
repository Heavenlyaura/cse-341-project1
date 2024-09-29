const {
  getAllContacts,
  getContactById,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/contacts");

/* ************************************
  GET ALL CONTACT AND SEND TO CLIENT
 ************************************** */
async function sendAllContacts(req, res) {
  //#swagger.tags=["Users"]
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

/* ************************************
  GET SINGLE CONTACT BY USER ID 
 ************************************** */
async function sendSingleContact(req, res) {
  //#swagger.tags=["Users"]
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

/* ************************************
  CREATE NEW USER
 ************************************** */
async function createUserInfo(req, res) {
  //#swagger.tags=["Users"]
  try {
    const { firstName, lastName, email, favouriteColor, birthDay } = req.body;
    const user = await createUser({
      firstName,
      lastName,
      email,
      favouriteColor,
      birthDay,
    });
    if (!user) {
      return res.status(500).send("User could not be created.");
    }
    return res
      .status(201)
      .json({ result: `User ${user} has been sucessfully created!` });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/* ************************************
  UPDATE USER INFORMATION
 ************************************** */
async function updateContactInfo(req, res) {
  //#swagger.tags=["Users"]
  try {
    const id = req.params.ID;
    const { firstName, lastName, email, favouriteColor, birthDay } = req.body;

    const updateResult = await updateUser(id, {
      firstName,
      lastName,
      email,
      favouriteColor,
      birthDay,
    });

    if (updateResult.modifiedCount === 0) {
      // No content was modified, send 204 with no content
      return res.status(204).send();
    }

    return res
      .status(200)
      .json({ result: `User with ID ${id} has been updated successfully` });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/* ************************************
  DELETE CONTACT INFO
 ************************************** */
async function deleteContactInfo(req, res) {
  //#swagger.tags=["Users"]
  try {
    const id = req.params.ID;

    const deleteResult = await deleteUser(id); // Assuming `deleteUser` is a function that deletes the user by ID

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ message: `User with ID ${id} has been deleted successfully` });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  sendAllContacts,
  sendSingleContact,
  createUserInfo,
  updateContactInfo,
  deleteContactInfo,
};
