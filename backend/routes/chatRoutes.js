const express=require("express");
const {protect}=require('../middleware/authMiddleware');
const {accessChat,getChats,createGroupChat,renameGroup,addToGroup,removeFromGroup}=require('../controllers/chatController');
const router=express.Router();

router.route('/').post(protect,accessChat);
router.route("/").get(protect,getChats);

router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/groupremove").put(protect,removeFromGroup);
router.route("/groupadd").put(protect,addToGroup);

module.exports=router;
