require ('dotenv').config();
const express = require("express");
const router =express();

router.use(express.json());
const UserController = require('../controllers/userController')


router.post('/send-otp',UserController.sendOtp);
router.post('/verify-otp',UserController.verifyOtp);
module.exports=router;