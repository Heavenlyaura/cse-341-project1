const express = require("express");
const app = express();
const router = require("./routes");
const { connectToDB } = require("./models/connectDB");

const port = process.env.PORT || 3000;

/* *****************************************
 * ROUTES
 ******************************************* */
app.use("/", router);



/* *****************************************
 * C0NNECT TO DATABASE AND START SERVER
 ******************************************* */
connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
