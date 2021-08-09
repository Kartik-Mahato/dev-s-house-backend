const router = require("express").Router();
const activateController = require("./controllers/activate-controller");
const authController = require("./controllers/auth-controller");
const { auth } = require("./middlewares/auth-middleware");

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate", auth, activateController.activate);
router.get("/api/refresh", authController.refresh);
router.post("/api/logout", auth, authController.logout);

module.exports = router;
