const express = require("express");
const blogController = require("../controllers/blogController");
const upload = require("../middleware/uploadConfig");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, blogController.createBlog);
router.get("/all", blogController.getAllBlogs);
router.get("/filter", blogController.filterBlogs);
router.get("/latest", blogController.getLastestBlog);
router.get("/trending", blogController.getTrendingBlogs);
router.get("/category/:category", blogController.getBlogsByCategory);
router.get("/blog/:id", blogController.getBlogById);
router.get("/:slug", blogController.getBlogBySlug);
router.get("/", authMiddleware, blogController.getAllBlogsUser);
router.post("/:id/like", authMiddleware, blogController.likeBlog);
router.get("/user/liked-blogs", authMiddleware, blogController.getLikedBlogs);
router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  blogController.getAllBlogsAdmin
);

router.patch("/edit/:id", authMiddleware, blogController.editBlog);
router.delete("/delete/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
