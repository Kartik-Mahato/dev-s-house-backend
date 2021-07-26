require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));