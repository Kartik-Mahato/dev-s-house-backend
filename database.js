const mongoose = require("mongoose");

function databaseConnection() {
  const DB_URL = process.env.DB_URI;
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;
  db.on("error", () => console.error.bind(console, "connection error"));
  db.once("open", () => {
    console.log("DB Connected");
  });
}

module.exports = databaseConnection
