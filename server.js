require("dotenv").config();
const express = require("express");
const cors = require("cors");
const databaseConnection = require("./database");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

databaseConnection();

app.use("/", require("./routes"));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
