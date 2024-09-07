const express = require("express");
const blogController = require("../controllers/blogController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, blogController.createBlog);
router.get("/filter", blogController.filterBlogs);
router.get("/lastest", blogController.getLastestBlog);
router.get("/:id", authMiddleware, blogController.getBlogById);
router.get("/", authMiddleware, blogController.getAllBlogsUser);
router.post("/:id/like", authMiddleware, blogController.likeBlog);
router.get("/user/liked-blogs", authMiddleware, blogController.getLikedBlogs);
router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  blogController.getAllBlogsAdmin
);
router.patch("/edit/:id", authMiddleware, blogController.editBlog);
router.delete("/delete/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
