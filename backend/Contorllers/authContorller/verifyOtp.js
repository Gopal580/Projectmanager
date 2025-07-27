exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const record = global.otpStore?.[email];
   
  
  if (!record || Date.now() > record.expires)
    return res.status(400).json({ success: false, message: "OTP expired or invalid" });
  
  if (record.otp !== otp)
    {
    return res.status(400).json({ success: false, message: "Incorrect OTP" });}

  // OTP verified!
  delete global.otpStore[email]; // cleanup
  res.status(200).json({ success: true, message: "OTP verified" });
};
