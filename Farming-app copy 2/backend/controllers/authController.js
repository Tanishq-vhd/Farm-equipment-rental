const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");

exports.register = async (req, res) => {
  try {
    console.log("📥 Received registration data:", JSON.stringify(req.body, null, 2));

    const { name, email, password, address, contactInfo } = req.body;

    // Check for missing fields
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !address.state ||
      !address.district ||
      !address.area ||
      !address.pincode ||
      !contactInfo
    ) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists. Try logging in." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      contactInfo,
    });

    console.log("✅ User created successfully:", newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
      message: "Registration successful",
    });
  } catch (error) {
    console.error("❌ Registration error (detailed):", error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 Login attempt:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter both email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid credentials for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Login successful:", email);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "Login successful",
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: error.message });
  }
};
