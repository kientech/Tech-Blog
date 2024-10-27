const express = require("express");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
// const slug = require("slugify")


exports.createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Kiểm tra xem người dùng đã được xác thực chưa
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    // Lấy các đường dẫn ảnh từ req.files
    const images = req.files.map((file) => file.path); // Sử dụng req.files để lấy đường dẫn ảnh

    // Tạo một blog mới
    const blog = new Blog({
      title,
      content,
      category,
      images, // Lưu trữ các đường dẫn ảnh
      author: req.user._id,
      status: "approved",
    });

    // Lưu blog vào cơ sở dữ liệu
    await blog.save();

    // Cập nhật người dùng để thêm blog mới vào danh sách
    await User.findByIdAndUpdate(req.user._id, { $push: { blogs: blog._id } });

    // Phản hồi thành công
    return res.status(200).json({
      status: "success",
      message: "Created New Blog Successfully!",
      data: blog,
    });
  } catch (error) {
    console.log("🚀 ~ exports.createBlog= ~ error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get a blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.views += 1;
    await blog.save();

    return res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get al blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.views += 1;
    await blog.save();

    return res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get all blogs of user authen
exports.getAllBlogsUser = async (req, res) => {
  try {
    const order = req.query.order === "desc" ? 1 : -1;

    const blogs = await Blog.find({ author: req.user.id }).sort({
      createdAt: order,
    });

    return res.status(200).json({
      status: "success",
      length: blogs.length,
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get all blog
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({
      status: "success",
      length: blogs.length,
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// edit blog by user
exports.editBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, category },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog Not Found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You can only edit your own blogs" });
    }

    return res.status(200).json({
      status: "success",
      message: "Updated Blog Successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// delete blog by user
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blog Not Found",
      });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You can only delete your own blogs" });
    }

    await User.findByIdAndUpdate(req.user._id, { $pull: { blogs: blog._id } });
    return res.status(200).json({
      status: "success",
      message: "Deleted Blog Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get lastest blogs
exports.getLastestBlog = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const latestBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .populate("author", "name email");

    return res.status(200).json({
      status: "success",
      length: latestBlogs.length,
      data: latestBlogs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// filter blogs
exports.filterBlogs = async (req, res) => {
  try {
    const { search, author, category, page = 1, limit = 8 } = req.query;

    const query = {};

    // search by title or content of a blog
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // search author
    if (author) {
      query.author = author;
    }

    // search category
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    const blogs = await Blog.find(query)
      .populate("author", "email")
      .skip(skip)
      .limit(Number(limit));

    const total = await Blog.countDocuments(query);

    if (blogs.length <= 0) {
      return res.status(404).json({
        status: "error",
        message: "Blogs Not Found!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: blogs,
      totalItems: total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// like blog function
exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (!Array.isArray(blog.likes)) {
      blog.likes = [];
    }

    const hasLiked = blog.likes.some(
      (userId) => userId.toString() === req.user._id.toString()
    );
    console.log("🚀 ~ exports.likeBlog= ~ hasLiked:", hasLiked);

    if (hasLiked) {
      blog.likes = blog.likes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );
      user.likedBlogs = user.likedBlogs.filter(
        (blogId) => blogId.toString() !== req.params.id.toString()
      );
    } else {
      blog.likes.push(req.user._id);
      user.likedBlogs.push(req.params.id);
    }

    await blog.save();
    await user.save();

    return res.status(200).json({
      status: "success",
      message: hasLiked ? "Blog unliked" : "Blog liked",
      data: blog.likes,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get blog trending
exports.getTrendingBlogs = async (req, res) => {
  const { count = 5 } = req.query;

  try {
    const topBlogs = await Blog.find({ views: { $gt: 0 } }) // Tìm các blog có views lớn hơn 0
      .sort({ views: -1 }) // Sắp xếp theo views giảm dần
      .limit(parseInt(count, 10)); // Giới hạn số lượng kết quả trả về

    return res.status(200).json({
      success: true,
      length: topBlogs.length,
      data: topBlogs,
    });
  } catch (error) {
    console.error("Error fetching top blogs by views:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// get blog by category
exports.getBlogsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const blogs = await Blog.find({ category: category });

    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ message: "No blogs found for this category" });
    }

    return res.status(200).json({
      status: "success",
      length: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// get liked blog
exports.getLikedBlogs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("likedBlogs");

    return res.status(200).json({
      status: "success",
      length: user.likedBlogs.length,
      data: user.likedBlogs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get all blogs role admin
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "email");
    return res.status(200).json({
      status: "success",
      length: blogs.length,
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
