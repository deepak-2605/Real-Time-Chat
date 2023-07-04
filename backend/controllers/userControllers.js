const asyncHandler=require("express-async-handler");
const User=require('../models/userSchema');
const generateToken = require('../config/generateToken');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Ignotus';

const registerUser = asyncHandler(async (req,res)=>{
    const { name, email, password, profilePic } = req.body;
    if(!name||!email||!password){
        res.status(400);
        success=false
        throw new Error("You are requested to enter all Feilds");
    }
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            success=false
          return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: name,
            email:email,
            password: password,
            profilePic: profilePic
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken, user })
        

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

   
})

const authenticateUser=asyncHandler(async(req,res)=>{
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        _id: user._id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken, user })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

// Route will be /api/user
const getAllUsers=asyncHandler(async(req,res)=>{
   const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({_id: { $ne: req.user._id } });
  res.send(users);
  

})

// updating about
const updateAbout = async (req, res) => {
    try {
        const { about } = req.body;
        const userId = req.user._id; // Access the authenticated user's ID from the request

        // Find the user by ID and update the "about" field
        const user = await User.findByIdAndUpdate(userId, { about }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'About updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports={registerUser, authenticateUser,getAllUsers,updateAbout};