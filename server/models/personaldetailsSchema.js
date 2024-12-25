const mongoose = require("mongoose");

const personalDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  age: { type: Number, required: true },
  emailAddress: { type: String, required: true, unique: true },
  profilePicture: { type: String }, // Optional
});

module.exports = mongoose.model("PersonalDetails", personalDetailsSchema);
