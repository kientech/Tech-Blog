const User = require("../models/userModel");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

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
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Credentials!",
      });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Password Not Match!",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Set the token in an httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side access to the cookie
      secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production
      sameSite: "strict", // Protects against CSRF
      maxAge: 60 * 60 * 1000, // 1 hour expiration
    });

    // Send the user info and token in the response
    return res.status(200).json({
      status: "success",
      message: "Login Successfully!",
      user: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// logout function
exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Logout Successfully!",
  });
};

// forgot password function
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Create reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Send reset email (adjust this according to your email utility)
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message: `You are receiving this email because you (or someone else) has requested to reset the password. Please make a PUT request to: \n\n${resetUrl}`,
    });

    return res.status(200).json({
      status: "success",
      message: "Password reset link sent to email.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// reset password function
exports.resetPassword = async (req, res) => {
  try {
    const resetToken = req.params.resetToken;

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired token",
      });
    }

    const password = req.body.password;
    if (!password) {
      return res.status(400).json({
        status: "error",
        message: "Password is required",
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password Reset Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
