const asyncHandler=require("express-async-handler");
const User=require('../models/userSchema');
const generateToken=require('../config/generateToken');


const registerUser = asyncHandler(async (req,res)=>{
    const { name, email, password, profilePic } = req.body;
    console.log("hello");
    console.log(req.body);
    if(!name||!email||!password){
        res.status(400);
        throw new Error("You are requested to enter all Feilds");
    }
    

    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User Already exists with this email id");
    }
    
    const user = await User.create({
        name,
        email,
        password,
        profilePic,
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            profilePic:user.profilePic,
            token:generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error("Failed to create the new user");
    }
})

const authenticateUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});

    if(user&&(await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            profilePic:user.profilePic,
            token:generateToken(user._id),
        })
    }else{
        res.status(401);
        throw new Error("Invalid Email ID or Passowrd");
    }
})

// Route will be /api/user
const getAllUsers=asyncHandler(async(req,res)=>{
   const keyword=req.query.search
   ?{
    $or:[
         {name:{ $regex: req.query.search,$options: "i"}},
         {email:{ $regex: req.query.search,$options: "i"}},
    ]
   }:{};

   const users=await User.find(keyword).find({_id:{$ne: req.user._id}});
   res.send(users);

})

module.exports={registerUser, authenticateUser,getAllUsers};