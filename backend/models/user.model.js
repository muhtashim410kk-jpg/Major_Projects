import mongoose from "mongoose";

const Userschema= new mongoose.Schema({

   name:{
    type:String,
    required:true
   },
   email:{
      type:String,
      required:true,
      unique:true

   },
  password:{
    type:String
   },

   resetPasswordToken:{
    type:String
   },
   resetPasswordExpires:{
    type:Date
   },

   assistantName:{
    type:String
   },
   assistantImage:{
    type:String
   },
chats: [
  {
    title: String,
    messages: [
      {
        question: String,
        response: String
      }
    ]
  }
]

},{timestamps:true})

const User = mongoose.model("User",Userschema)
export default User