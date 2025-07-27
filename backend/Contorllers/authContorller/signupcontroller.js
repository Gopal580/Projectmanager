const bcrypt = require('bcrypt');
const User = require('../../Models/AuthModels/User'); 

exports.signupapi = async (req, res) => {

  
  try {
    
         
    const { username, email, password } = req.body;
     
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
 
    // Check if user already exists
    const existingUser = await User.findOne({ email:email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
 
    // Save user
    const newUser = new User({
      userName:username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully',
      success:true,
    });


  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

