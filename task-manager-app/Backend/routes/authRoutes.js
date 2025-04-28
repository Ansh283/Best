const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const router = express.Router();

// POST /signup - Register a new user
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Create a new user (password is hashed via pre-save middleware in User model)
    const newUser = new User({ email, password });

    // Save user to database
    await newUser.save();

    // Generate a JWT token immediately after signup
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User registered successfully!", token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// POST /login - Authenticate user and return a JWT token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in database
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
