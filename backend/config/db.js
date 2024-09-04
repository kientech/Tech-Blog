const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Tech Blog Connected to Mongo Database!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
