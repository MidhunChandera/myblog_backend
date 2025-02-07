const usermodel = require("../models/usermodel");
const jwt = require("jsonwebtoken");

const createtoken = (id) => {
  return jwt.sign({ id }, process.env.jwt_secret, { expiresIn: '1h' });
};

exports.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email, password });
    if (user) {
      const token = createtoken(user._id);
      res.status(200).json({ user, token });
    } else {
      res.status(406).json("Incorrect email or password");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.registeruser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existinguser = await usermodel.findOne({ email });
    if (existinguser) {
      res.status(406).json('User already exists');
    } else {
      const newuser = new usermodel({
        username,
        email,
        password
      });

      const user = await newuser.save();
      const token = createtoken(user._id);
      res.json({ success: true, token });
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.getuserprofile = async (req, res) => {
  try {
    
    const userId = req.user.id;

    // Fetch the user details from the database
    const user = await usermodel.findById(userId).select('-password'); // Exclude password for security

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

  
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user details', details: error.message });
  }
};

