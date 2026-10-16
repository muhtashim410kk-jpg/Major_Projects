
  import express from 'express'
import { googleLogin, Login, Logout, signup, forgotPassword, resetPassword } from '../controllers/auth.controller.js'


  const authRouter= express.Router()

  authRouter.post('/signin',Login)
  authRouter.get('/logout',Logout)
  authRouter.post('/signup',signup)
  authRouter.post('/google',googleLogin)
  authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password/:token', resetPassword)


  export default authRouter