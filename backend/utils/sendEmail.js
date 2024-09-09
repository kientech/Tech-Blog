const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "nova61@ethereal.email",
    pass: "xfcAnCFkcwHMxGYdWj",
  },
});

// Function to send an email
const sendEmail = async (options) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM, // Sender address
    to: options.email, // Recipient address
    subject: options.subject, // Subject line
    text: options.message, // Plain text body
    // Optionally, you can add HTML content:
    // html: options.html, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
