import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    default: Date.now,
    get: (otpExpiration) => otpExpiration.getTime(),
    set: (otpExpiration) => new Date(otpExpiration),
  },
});

const Otp = mongoose.model("Otp", UserSchema);
export default Otp;
