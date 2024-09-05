const express = require("express");
const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authMiddleware, authController.forgotPassword);
router.put(
  "/reset-password/:resetToken",
  authMiddleware,
  authController.resetPassword
);
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
