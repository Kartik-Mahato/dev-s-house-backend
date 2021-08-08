const TokenService = require("../services/Token-service");

exports.auth = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw new Error();

    const userData = await TokenService.verifyToken(accessToken);

    if (!userData) throw new Error();

    req.user = userData;
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
