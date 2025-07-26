const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail"); // We'll create this next
const crypto = require("crypto");

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2. Generate token
    const resetToken = user.generateResetToken();
    await user.save();

    // 3. Construct reset URL
     const resetUrl = `https://movienerds.vercel.app/reset-password/${resetToken}`;

    // 4. Email content
    const message = `
You requested a password reset for your MovieNerds account.

Click the link below to reset your password:
${resetUrl}

If you did not request this, please ignore this email.
    `;

    // 5. Send the email
    await sendEmail(user.email, "Password Reset - MovieNerds", message);

    return res.json({ success: true, message: "Reset link sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
