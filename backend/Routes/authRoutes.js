const express = require('express');
const router = express.Router();
const {signupapi}=require('../Contorllers/authContorller/signupcontroller')
const {loginapi}=require('../Contorllers/authContorller/logincontroller')
const mailapi=require('../Contorllers/mailer/mailsender')
const {sendOtp}=require('../Contorllers/authContorller/sendOtp')
const {verifyOtp}=require('../Contorllers/authContorller/verifyOtp')
const {resetPassword}=require('../Contorllers/authContorller/sendResetOtp')
const refreshTokenapi=require('../Contorllers/authContorller/refreshTokenapi')
const  checkUserExistence=require('../middlewares/checkUserExistance');
router.post('/signup',signupapi);
router.post('/login',loginapi);
router.post('/mail',mailapi)
router.post('/refresh',refreshTokenapi)
router.post('/send-otp',checkUserExistence(),sendOtp);
router.post('/verify-otp',verifyOtp);
router.post('/reset-password',resetPassword)

module.exports = router;
