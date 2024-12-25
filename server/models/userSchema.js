import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true, // Note: fixed typo from "require" to "required"
    },
    otp: {
        type: Number,
        required: true, // Note: fixed typo from "require" to "required"
    },
    otpExpiration: {
        type: Date,
        default: Date.now,
        get: (otpExpiration) => otpExpiration.getTime(),
        set: (otpExpiration) => new Date(otpExpiration),
    },
});

const Otp = mongoose.model('Otp', UserSchema);
export default Otp;
