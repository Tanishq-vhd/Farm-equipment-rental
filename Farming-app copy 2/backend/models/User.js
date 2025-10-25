const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  state: { type: String, required: [true, "State is required"] },
  district: { type: String, required: [true, "District is required"] },
  area: { type: String, required: [true, "Area is required"] },
  pincode: {
    type: String,
    required: [true, "Pincode is required"],
    match: [/^\d{6}$/, "Pincode must be a 6-digit number"],
  },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    address: { type: addressSchema, required: true },
    contactInfo: {
      type: String,
      required: [true, "Contact info is required"],
      match: [/^\d{10}$/, "Contact number must be 10 digits"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
