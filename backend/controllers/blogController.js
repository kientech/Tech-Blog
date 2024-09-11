const express = require("express");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");

exports.createBlog = async (req, res) => {
  console.log("hihi");
  console.log(req.user);

  try {
    const { title, content, category, image } = req.body;
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }
    // Create a new blog
    const blog = new Blog({
      title,
      content,
      category,
      image,
      author: req.user._id,
      status: "pending",
    });

    await blog.save();

    await User.findByIdAndUpdate(req.user._id, { $push: { blogs: blog._id } });

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

// get all blogs of user authen
exports.getAllBlogsUser = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id });
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

// get liked blog
exports.getLikedBlogs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("likedBlogs");

    return res.status(200).json({
      status: "success",
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
