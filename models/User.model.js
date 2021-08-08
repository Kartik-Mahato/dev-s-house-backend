const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String, required: true },
    activated: { type: Boolean, required: false, default: false },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
