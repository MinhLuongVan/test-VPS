require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./router/authRouter')
const userRouter = require('./router/userRouter')
const todoRouter = require('./router/todoRouter')
const app = express()
app.use(express.json())
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };
app.use(cors(corsOptions))
app.use(cookieParser())


//Router
app.use('/i1/auth',authRouter);
app.use('/i1/user',userRouter);
app.use('/td1/list',todoRouter);

const connect = async() => {
    try {

        await mongoose.connect('mongodb://localhost:27017/ListToDo')
        console.log("Kết nối thành công");
        
    } catch (error) {
        console.log("Kết nối thất bại");
    }
}
connect();

app.listen(8000,() => {

    console.log(`server run on 8000`);
});



