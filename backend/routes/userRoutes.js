const express = require("express");
const userController = require("../controllers/userController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", authMiddleware, userController.getUser);
router.patch("/profile", authMiddleware, userController.updateUser);
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
);

module.exports = router;
