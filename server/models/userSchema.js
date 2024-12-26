// const { set } = require("../routes/UserRoute");
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    require: true,
  },
  otp: {
    type: Number,
    require: true,
  },
  otpExpiration: {
    type: Date,
    default: Date.now,
    get: (otpExpiration) => otpExpiration.getTime(),
    set: (otpExpiration) => new Date(otpExpiration),
  },
});

// module.exports =
const UserSchema = mongoose.model("UserSchema", userSchema);
export default UserSchema;
