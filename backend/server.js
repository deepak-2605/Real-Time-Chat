const express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors')
const dotenv = require("dotenv");
const connecttoDB = require("./config/db");
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
var bodyParser = require('body-parser');   
const path=require("path");
const chatRoutes=require('./routes/chatRoutes');
const messageRoutes=require('./routes/messageRoutes');
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
const app = express();
dotenv.config();
connecttoDB();
app.use(cors());
app.use(express.json());


// For UserRoutes
 app.use('/api/user', cors() , require('./routes/userRoutes'));

//  Chat Routes

app.use('/api/chat', cors() , chatRoutes);

// message routes

app.use("/api/message",messageRoutes);

// For error handling functions
 
// ----DEPLOYMENT ----
const __dirname1=path.resolve();
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname1,"/frontend/build")));
    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
    })
}else{
   app.get("/", (req, res) => {
      res.send("API is running");
  })
}

// ----DEPLOYMENT ----
const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`server started on ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    origin: true
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
    console.log(userData._id);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (id,userList, currentUser,chatId) => {

    if (!userList) return ;

    userList.forEach((user) => {
      if (user._id === id) return;
      socket.in(user._id).emit("typing", currentUser,chatId);
    });
  });
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.usersList) return console.log("chat.users not defined");

    chat.usersList.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});