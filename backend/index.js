import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

let app = express()

const port = process.env.PORT || 8000

app.get('/',(req,res)=>{

 res.send('hi')


})

app.listen(port,()=>{
    console.log("server is running");
    
})