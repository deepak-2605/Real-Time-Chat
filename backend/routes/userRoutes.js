const express=require('express');
const {registerUser,authenticateUser,getAllUsers}=require('../controllers/userControllers');
const {protect}=require("../middleware/authMiddleware");
const router=express.Router();

router.route("/").post(registerUser);

router.post("/login",authenticateUser)

module.exports=router;