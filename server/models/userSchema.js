import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  otpExpiration: {
    type: Date,
    default: () => new Date(Date.now() + 5 * 60 * 1000), // Set expiration to 5 minutes from now
  },
  role: {
    type: String,
    enum: ["user", "admin", "agent"],
    default: "user",
  },
});

const Otp = mongoose.models.Otp || mongoose.model("Otp", userSchema);
export default Otp;
