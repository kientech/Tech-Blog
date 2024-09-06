const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://cdn.dribbble.com/userupload/13153732/file/original-46942ab03ab022cc8dc3cbc5a558ed69.png?resize=1504x1128",
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  socialMedia: {
    tiktok: {
      type: String,
      default: "#",
    },
    facebook: {
      type: String,
      default: "#",
    },
    twitter: {
      type: String,
      default: "#",
    },
    youtube: {
      type: String,
      default: "#",
    },
    instagram: {
      type: String,
      default: "#",
    },
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: String,
  },
});

// Hash password pre save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
