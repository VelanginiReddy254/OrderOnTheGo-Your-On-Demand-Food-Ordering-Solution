const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtSecret = "mysecretkey"; // Make sure to put this in an env variable for production!

// === Signup Route ===
router.post('/createuser', async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already exists with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location: req.body.location
    });

    return res.status(201).json({ success: true });

  } catch (error) {
    // Handle Mongo duplicate error explicitly
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Email already exists" });
    }
    console.error(error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
});

// === Login Route ===
router.post(
  '/loginuser',
  (req, res, next) => {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.length < 5
    ) {
      return res.status(400).json({
        success: false,
        errors: "Try logging in with correct credentials"
      });
    }

    next();
  },
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const userData = await User.findOne({ email });

      // Make sure user exists before comparing password
      if (!userData) {
        return res.status(400).json({ success: false, errors: "Try logging in with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(password, userData.password);
      if (!pwdCompare) {
        return res.status(400).json({ success: false, errors: "Try logging in with correct credentials" });
      }

      const data = {
        user: { id: userData.id }
      };
      const authToken = jwt.sign(data, jwtSecret);

      return res.status(200).json({ success: true, authToken: authToken });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, errors: "Internal Server Error" });
    }
  }
);

module.exports = router;