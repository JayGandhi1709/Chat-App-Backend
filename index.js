// IMPORTS FROM PACKAGES
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// IMPORTS FORM OTHER FILES
dotenv.config({ path: "./config.env" });
const authRouter = require("./routes/auth");

// INIT
const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
require("./db/conn");
app.use(express.json());

// Link Routes files
app.use(authRouter);


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Connected at port ${PORT}`);
  });