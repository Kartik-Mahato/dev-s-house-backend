const mongoose = require("mongoose");

const refreshTokenSchema = mongoose.Schema(
  {
    token: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RefreshToken", refreshTokenSchema, "tokens");
