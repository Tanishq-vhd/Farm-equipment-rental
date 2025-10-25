require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User"); // this must point to your User model

async function addUser() {
  try {
    // Step 1: connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    // Step 2: create and save a new user
    const newUser = await User.create({
      name: "J Anshu",
      email: "anshu@example.com",
      address: "Ranchi",
      contactInfo: "9999999999",
    });

    console.log("✅ User saved:", newUser);

    // Step 3: close connection
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  } catch (err) {
    console.error("❌ Error saving user:", err.message);
  }
}

// Run the function
addUser();
