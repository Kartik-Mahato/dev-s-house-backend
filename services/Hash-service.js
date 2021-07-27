const crypto = require("crypto");

class HashService {
  hashOTP(data) {
    return crypto
      .createHmac("sha256", process.env.HashSecret)
      .update(data)
      .digest("hex");
  }
}

module.exports = new HashService();
