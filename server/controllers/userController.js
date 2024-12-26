import UserSchema from "../models/userSchema.js";
import otpVerification from "../helpers/otpValidate.js";

import otpGenearator from "otp-generator";
import twilio from "twilio";

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
    await UserSchema.findOneAndUpdate(
      { phoneNumber },
      { otp, otpExpiration: new Date(cDate.getTime()) },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await TwilioClient.messages.create({
      body: `Your OTP for logging in Online Tailoring is: ${otp}`,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    return res.status(201).json({
      success: true,
      msg: "OTP Sent Successfully " + otp,
    });
  } catch (error) {
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

    const isOtpExpired = await otpVerification(OtpData.otpExpiration);

    if (isOtpExpired) {
      return res.status(500).json({
        success: false,
        msg: "Your OTP has expired.",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Your OTP has been Verified Successfully !",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
