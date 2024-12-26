// import ('dotenv').config();
import express from "express";
const router =express();

router.use(express.json());
import {sendOtp , verifyOtp } from '../controllers/userController.js'


router.post('/send-otp',sendOtp);
router.post('/verify-otp',verifyOtp);


export default router;