// controllers/auth/sendOtp.js
const sendMail = require('../../Contorllers/mailer/mailsender');
const otpGenerator = require('otp-generator');

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
   
  //  Secure 6-digit numeric OTP
  const otp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  //  Store OTP temporarily 
  global.otpStore = global.otpStore || {};
  global.otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

  //  Send Email
  const html = `<h2>Your OTP is: <strong>${otp}</strong></h2><p>This OTP is valid for 5 minutes.</p>`;

  try {
    await sendMail({
      to: email,
      subject: "Your OTP for Signup",
      html,
    });

    res.status(200).json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("OTP email error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};
