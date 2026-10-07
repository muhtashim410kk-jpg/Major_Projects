
import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import   {OAuth2Client}    from 'google-auth-library'

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


 export  async function signup(req,res){

  try {

      const {name,email,password} = req.body;

    const existEmail = await User.findOne({email})

    if(existEmail){
       return res.status(400).json({message:"Email already exist"})
    }

     if(password.length<6){
       return res.status(400).json({message:"Password must be at least 6 characters long"})
     }

     const hashedpassword = await  bcrypt.hash(password,10)

     const user = await User.create({
        name,password:hashedpassword,email
     })
  
     const token = await generateToken(user._id)

     res.cookie("token",token,{
        httpOnly:true,
        maxAge:8*24*60*60*1000,
        sameSite:"None",
        secure:true
     })

     return res.status(201).json(user)
    
  } catch (error) {
    return res.status(500).json({message:`Sign up error ${error}`})
  }




 }



  export  async function Login(req,res){

  try {

      const {email,password} = req.body;

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({message:"Email does not exist"})
    }

     const isMatchPass = await bcrypt.compare(password,user.password)

     if(!isMatchPass){
              return res.status(400).json({message:"Incorrect password"})
     }
 
     const token = await generateToken(user._id)

     res.cookie("token",token,{
        httpOnly:true,
        maxAge:8*24*60*60*1000,
        sameSite:"None",
        secure:true
     })

     return res.status(200).json(user)
    
  } catch (error) {
    return res.status(500).json({message:`Login  error ${error}`})
  }




 }


 export async function Logout(req,res){
 
    try {

        res.clearCookie("token")
       return res.status(200).json({message:"Logout Successfully"})
        
    } catch (error) {
        return res.status(500).json({message:`Logout  error ${error}`})
    }


 }


 export async function googleLogin(req, res) {
  try {
    const { credential } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload.email_verified) {
      return res.status(400).json({ message: "Google email is not verified" });
    }

    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email
      });
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 8 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true
    });

    return res.status(200).json(user);

  } catch (error) {
    console.log("GOOGLE LOGIN ERROR:", error);
    return res.status(500).json({ message: "Google login failed" });
  }
}
