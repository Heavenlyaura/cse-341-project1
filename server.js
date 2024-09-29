const express = require("express");
const router = require("./routes");
const cors = require("cors");
const { connectToDB } = require("./models/connectDB");

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes
const port = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

/* *****************************************
 * ROUTES
 ******************************************* */
app.use("/", router);

/* *****************************************
 * START SERVER AND C0NNECT TO DATABASE
 ******************************************* */

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
  connectToDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
});
