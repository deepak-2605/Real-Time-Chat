const express=require('express');
const {registerUser,authenticateUser,getAllUsers,updateAbout}=require('../controllers/userControllers');
const {protect}=require("../middleware/authMiddleware");
const router=express.Router();

router.route("/").post(registerUser);
router.route("/").get(protect,getAllUsers);
router.post("/login",authenticateUser);
router.put('/about', protect, updateAbout); 

module.exports=router;