const crypto = require("crypto");
const HashService = require("./Hash-service");

const smsSid = process.env.SMS_SID;
const smsAuth = process.env.SMS_AUTH;

const twilio = require("twilio")(smsSid, smsAuth, { lazyLoading: true });

class OTPService {
  async generateOTP() {
    return crypto.randomInt(1000, 9999);
  }
  async sendOTPBySMS(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your Dev's House OTP is: ${otp}`,
    });
  }
  verifyOTP(hashedOtp, data) {
    let computedHash = HashService.hashOTP(data);

    return computedHash === hashedOtp;
  }
}

module.exports = new OTPService();
