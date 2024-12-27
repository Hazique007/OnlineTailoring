import UserSchema from '../models/userSchema.js';
import otpVerification from '../helpers/otpValidate.js';
import otpGenearator from 'otp-generator';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TwilioClient = new twilio(accountSid, authToken);

export const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = otpGenearator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const cDate = new Date();
    try {
      await UserSchema.findOneAndUpdate(
        { phoneNumber },
        { otp, otpExpiration: new Date(cDate.getTime()) },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (dbError) {
      console.error("Error updating user OTP:", dbError);
      return res.status(500).json({
        success: false,
        msg: "Database error while saving OTP.",
      });
    }

    try {
      await TwilioClient.messages.create({
        body: `Your OTP for logging in Online Tailoring is: ${otp}`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
      });
    } catch (twilioError) {
      console.error("Twilio error:", twilioError);
      return res.status(500).json({
        success: false,
        msg: "Error sending OTP via Twilio.",
      });
    }

    return res.status(201).json({
      success: true,
      msg: "OTP Sent Successfully " + otp,
    });
  } catch (error) {
    console.error("Error in sendOtp function:", error);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const OtpData = await UserSchema.findOne({
      phoneNumber,
      otp,
    });

    if (!OtpData) {
      return res.status(500).json({
        success: false,
        msg: "You entered the wrong OTP!",
      });
    }

    const isotpExpired = await otpVerification(OtpData.otpExpiration);
    if (isotpExpired) {
      return res.status(500).json({
        success: false,
        msg: "OTP has expired",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "OTP verified successfully",
      user: OtpData,
    });
  } catch (error) {
    console.error("Error in verifyOtp function:", error);
    return res.status(500).json({
      success: false,
      msg: "Error during OTP verification. Please try again.",
    });
  }
};
