require('dotenv').config()
const express=require('express');
const cors =require('cors');
const corsOptions=require('./config/corsOptions');
const connctDB=require('./config/dbConn');
const { default: mongoose } = require('mongoose');
const PORT=process.env.PORT||1003
connctDB()
const app=express()

//middlewareS
app.use(cors(corsOptions))
app.use(express.static("public"))
app.use(express.json())

//routes
app.use("/api/apartment",require("./Routes/Apartment"))
app.use("/api/user",require("./Routes/User"))
app.use('/api/auth',require('./Routes/authRoutes'))


app.get('/',(req,res)=>{res.send("this is home page")})




mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT,()=>{console.log(`server running on ${PORT}`)})
})
mongoose.connection.on('error',err=>{
    console.log(err)
})

