const User = require("../../Models/AuthModels/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.loginapi = async (req, res) => {
 
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Login success
   
    const token = jwt.sign({id:user._id,email:user.email,userName:user.userName}, process.env.JWT_SECRET, { expiresIn: '1h' });
   const refreshToken = jwt.sign({id:user._id,email:user.email,userName:user.userName}, process.env.JWT_SECRET, { expiresIn: '7d' });
     
    res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: false,         
  sameSite: 'Lax',       
  maxAge: 3600000        
});

    res.status(200).json({
      message: 'Login successful',
      success:true,
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        token:token
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
