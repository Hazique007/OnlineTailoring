require ('dotenv').config();
import express from 'express'
const router =express();

router.use(express.json());
const UserController = require('../controllers/userController')


router.post('/send-otp',UserController.sendOtp);
router.post('/verify-otp',UserController.verifyOtp);
export default router