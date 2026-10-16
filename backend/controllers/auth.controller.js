import crypto from "crypto";
import transporter from "../config/nodemailer.js";
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

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "If the account exists, a reset email will be sent."
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Your Password",
      text: `Click this link to reset your password: ${resetLink}`
    });

    return res.status(200).json({
      message: "If the account exists, a reset email will be sent."
    });
 } catch (error) {
  console.error("FORGOT PASSWORD ERROR:", error);
  return res.status(500).json({
    message: "Unable to process password reset request."
  });
}

}

export async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long."
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Reset link is invalid or expired."
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to reset password."
    });
  }
}
