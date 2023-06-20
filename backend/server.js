const express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors')
const dotenv = require("dotenv");
const connecttoDB = require("./config/db");
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
var bodyParser = require('body-parser');   
const chatRoutes=require('./routes/chatRoutes');
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
const app = express();

dotenv.config();
connecttoDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
})
// For UserRoutes
 app.use('/api/user', cors(),require('./routes/userRoutes'));

//  Chat Routes

app.use('/api/chat',chatRoutes);

// For error handling functions
 


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server started on ${PORT}`));