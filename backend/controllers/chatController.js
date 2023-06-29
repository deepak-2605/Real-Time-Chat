const asyncHandler=require("express-async-handler");
const Chat=require('../models/chatSchema');
const User=require('../models/userSchema');
const Message=require('../models/messageSchema');
const accessChat = asyncHandler(async (req, res) => {
    const {userId}=req.body;
    if(!userId){
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    var isChatExist=await Chat.find({
        isGroupChat:false,
        $and:[
            {usersList:{$elemMatch:{$eq:req.user._id}}},
            {usersList:{$elemMatch:{$eq:userId}}},
        ]
    }).populate("usersList","-password").populate("recentMessage");

    isChatExist=await User.populate(isChatExist,{
        path:'recentMessage.sender',
        select:'name email profilePic',

    })

    if (isChatExist.length > 0) {
        console.log("chat already exists");
        res.send(isChatExist[0]);
    }else{
        var chat={
            chatName: "sender",
            isGroupChat: false,
            usersList:[req.user._id,userId]
        }

        try{
            const newchat=await Chat.create(chat);

            const FullChat=await Chat.findOne({_id: newchat._id}).populate("usersList","-password").populate("recentMessage");
            console.log("chat created");
            res.status(200).send(FullChat);
        } catch(error){
            res.status(400);
            throw new Error(error.message);
        }
    }
})

const getChats=asyncHandler(async(req,res)=>{
    try{
           Chat.find({usersList:{$elemMatch:{$eq: req.user._id}}})
           .populate("usersList","-password")
           .populate("groupAdmin","-password")
           .populate("recentMessage")
           .sort({updatedAt:-1})
           .then(async(results)=>{
            results=await User.populate(results,{
                path:"recentMessage.sender",
                select:"name email profilePic"
            });

            res.status(200).send(results);
           })
          
    }catch(error){
         res.status(400);
         throw new Error(error.message);
    }
})

const createGroupChat = asyncHandler(async (req, res) => {
    if(!req.body.users||!req.body.name){
        return res.status(400).send({measage: "Please Fill All the feilds."})
    }
    var users=JSON.parse(req.body.users);
    if(users.length<2){
        return res.status(400).send("More than 2 users are required to form a group");
    }
    const user = req.user._id;
    users.push(user);
     
    try{
        const newgroupChat=await Chat.create({
                 chatName:req.body.name,
                 usersList:users,
                 isGroupChat:true,
                 groupAdmin:req.user,
        })
        console.log(newgroupChat);
        const fullGroupChat=await Chat.findOne({_id:newgroupChat._id})
        .populate("usersList","-password")
        .populate("groupAdmin","-password")
        res.status(200).json(fullGroupChat);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
})

const renameGroup=asyncHandler(async(req,res)=>{
    const {chatId,chatName}=req.body;
    const updatedChat=await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName
        },
        {
            new: true
        }
    )
    .populate("usersList","-password")
    .populate("groupAdmin","-password")
    if(!updatedChat){
            res.status(404);
            throw new Error("Chat Not Found");
    }else{
        res.json(updatedChat);
    }
})

const addToGroup=asyncHandler(async(req,res)=>{
    const {chatId,userId}=req.body;

    const added=await Chat.findByIdAndUpdate(chatId,{
        $push:{usersList: userId},
    },{
       new:true
    }
    )
     .populate("usersList","-password")
    .populate("groupAdmin","-password")

    if(!added){
        res.status(404);
        throw new Error("Chat Not Found");
    }else{
        res.json(added);
    }

})

const removeFromGroup=asyncHandler(async(req,res)=>{
    const {chatId,userId}=req.body;

    const deleted=await Chat.findByIdAndUpdate(chatId,{
        $pull:{usersList: userId},
    },{
       new:true
    }
    )
    .populate("usersList","-password")
    .populate("groupAdmin","-password")

    if(!deleted){
        res.status(404);
        throw new Error("Chat Not Found");
    }else{
        res.json(deleted);
    }
})
module.exports={accessChat,getChats,createGroupChat,renameGroup,addToGroup,removeFromGroup};