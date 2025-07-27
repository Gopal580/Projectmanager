// middlewares/checkUserExistence.js
const User = require("../Models/AuthModels/User");

const checkUserExistence = () => {
  return async (req, res, next) => {
    const { email, userName, purpose } = req.body;
    

    try {
      
      if (purpose === "signup") {
        const userNameMatch = await User.findOne({ userName });
        const emailMatch = await User.findOne({ email });

        if (emailMatch) {
          return res.status(400).json({
            success: false,
            message: "User already exists with this email. Please login.",
          });
        }

        if (userNameMatch) {
          return res.status(400).json({
            success: false,
            message: "Username already taken. Please choose another.",
          });
        }
      }

      
      if (purpose === "reset") {
        const emailMatch = await User.findOne({ email });

        if (!emailMatch) {
          return res.status(404).json({
            success: false,
            message: "No user found with this email.",
          });
        }
      }

      next(); 
    } catch (err) {
      console.error("User existence check error:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
};

module.exports = checkUserExistence;
