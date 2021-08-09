const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefresfToken.model");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "1y",
    });

    return { accessToken, refreshToken };
  }
  async verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
  async storeRefreshToken(token, userId) {
    try {
      await RefreshToken.create({
        token,
        userId,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  async verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  }
  async findRefreshToken(userId, token) {
    return await RefreshToken.findOne({ userId, token: token });
  }
  async updateRefreshToken(userId, token) {
    return await RefreshToken.updateOne({ userId }, { token });
  }

  async removeToken(token) {
    return await RefreshToken.deleteOne({ token });
  }
}

module.exports = new TokenService();
