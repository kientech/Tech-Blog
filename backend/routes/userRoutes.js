const express = require("express");
const userController = require("../controllers/userController");
const upload = require("../middleware/uploadConfig");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", authMiddleware, userController.getUser);
router.get("/users/:id", authMiddleware, userController.getUser);
router.patch(
  "/profile",
  authMiddleware,
  upload.single("avatar"),
  userController.updateUser
);
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
);

module.exports = router;
