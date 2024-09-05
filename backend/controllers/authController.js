const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register feature
exports.register = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  try {
    const user = new User({ fullname, username, email, password });
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "User Registered Successfully!",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Credentials!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Password Not Match!",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.status(200).json({
      status: "success",
      message: "Login Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Logout Successfully!",
  });
};
