const express = require("express");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");

exports.createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Create a new blog
    const blog = new Blog({
      title,
      content,
      category,
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


