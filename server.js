require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const databaseConnection = require("./database");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use("/storage", express.static("storage"));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

databaseConnection();

app.use("/", require("./routes"));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
