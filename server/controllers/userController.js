import UserSchema from "../models/userSchema.js";
import otpVerification from "../helpers/otpValidate.js";
import otpGenearator from "otp-generator";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TwilioClient = new twilio(accountSid, authToken);

const HARDCODED_PHONE = "911223334444";
const HARDCODED_OTP = 123456;

export const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log(req.body);

    // Handle hardcoded phone number
    if (phoneNumber === HARDCODED_PHONE) {
      try {
        // await UserSchema.findOneAndUpdate(
        //   { phoneNumber },
        //   { otp: HARDCODED_OTP, otpExpiration: new Date(Date.now() + 5 * 60 * 1000) }, // OTP valid for 5 minutes
        //   { upsert: true, new: true, setDefaultsOnInsert: true }
        // );
        // return res.status(201).json({
        //   success: true,
        //   msg: "OTP Sent Successfully (Hardcoded)",
        // });
        // res.to('/home')
      } catch (dbError) {
        console.error("Error updating user OTP for hardcoded phone:", dbError);
        return res.status(500).json({
          success: false,
          msg: "Database error while saving hardcoded OTP.",
        });
      }
    }

    // Generate OTP for other numbers
    if (phoneNumber === HARDCODED_PHONE) {
      otp = HARDCODED_OTP;
    } else {
      const otp = otpGenearator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
    }

    const cDate = new Date();
    try {
      await UserSchema.findOneAndUpdate(
        { phoneNumber },
        { otp, otpExpiration: new Date(cDate.getTime() + 5 * 60 * 1000) }, // OTP valid for 5 minutes
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
      msg: "OTP Sent Successfully",
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

    // Handle hardcoded phone number and OTP
    if (phoneNumber === HARDCODED_PHONE && otp === HARDCODED_OTP) {
      return res.status(200).json({
        success: true,
        msg: "OTP verified successfully (Hardcoded)",
        user: { phoneNumber, userId: "hardcodedUserId" }, // Mock user ID for testing
      });
    }

    // Verify OTP for other numbers
    const OtpData = await UserSchema.findOne({ phoneNumber, otp });

    if (!OtpData) {
      return res.status(500).json({
        success: false,
        msg: "You entered the wrong OTP!",
      });
    }

    const isOtpExpired = await otpVerification(OtpData.otpExpiration);
    if (isOtpExpired) {
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

export const getUserdetials = async (req, res) => {
  const { userID } = req.query;
  try {
    const user = await UserSchema.findOne({ userID });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user details" });
  }
};
