const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);

// Initialize PORT environment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Tech Blog Server listening on port ${PORT}...`);
});
