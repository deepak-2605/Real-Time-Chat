const asyncHandler = require('express-async-handler');
const Message = require('../models/messageSchema');
const User = require('../models/userSchema');
const Chat = require('../models/chatSchema');



const allMessage = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name profilePic email")
      .populate("chat")
    const isGroupChat = await Chat.findById(req.params.chatId)
      .populate("isGroupChat")
      .populate("chatName")
      .populate("usersList");
    messages.push(isGroupChat.isGroupChat);
    messages.push(isGroupChat.chatName);
    messages.push(isGroupChat.usersList);
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400); 
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat:chatId,
    }
  var success = false;
    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender", "name profilePic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: 'chat.usersList',  
            select: "name profilePic email",
        })
        await Chat.findByIdAndUpdate(req.body.chatId, {
            recentMessage:message,
        })
        success = true;
      res.json({ message ,success});
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = { sendMessage ,allMessage};