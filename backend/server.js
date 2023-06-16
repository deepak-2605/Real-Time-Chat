const express = require("express");
const dotenv = require("dotenv");
const connecttoDB = require("./config/db");
const userRoutes=require('./routes/userRoutes');
const {notFound,errorHandler}=require('./middleware/errorMiddleware')
const app = express();
dotenv.config();
connecttoDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
})
// For UserRoutes
app.use('/api/user',userRoutes);

// For error handling functions
 
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server started on ${PORT}`));