const HashService = require("../services/Hash-service");
const OTPService = require("../services/OTP-service");
const TokenService = require("../services/Token-service");
const UserService = require("../services/User-service");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const OTP = await OTPService.generateOTP();

    const ttl = 1000 * 60 * 60 * 24;

    const expires = Date.now() + ttl;

    const data = `${phone}.${OTP}.${expires}`;

    const hashedOTP = HashService.hashOTP(data);

    try {
      await OTPService.sendOTPBySMS(phone, OTP);
      return res.status(200).json({ hash: `${hashedOTP}.${expires}`, phone });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    const [hashedOtp, expires] = hash.split(".");

    if (Date.now() > +expires) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const data = `${phone}.${otp}.${expires}`;

    const isOTPvalid = OTPService.verifyOTP(hashedOtp, data);

    if (!isOTPvalid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user;

    // creating user
    try {
      user = await UserService.findUser({ phone });
      if (!user) {
        user = await UserService.createUser({ phone });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }

    // jwt generate
    const { accessToken, refreshToken } = TokenService.generateToken({
      _id: user._id,
      activated: false,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.json({ accessToken });
  }
}

module.exports = new AuthController();
