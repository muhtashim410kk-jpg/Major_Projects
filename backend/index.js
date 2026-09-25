import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import authRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import currentuserRouter from './routes/currentuser.route.js'




let app = express()

const port = process.env.PORT || 8000

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())

app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",currentuserRouter)
app.use(cookieParser())



app.listen(port,()=>{
    connectDB()
    console.log("server is running");
    
})