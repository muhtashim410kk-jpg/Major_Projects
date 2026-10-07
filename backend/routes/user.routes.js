
  import express from 'express'
import { googleLogin, Login, Logout, signup } from '../controllers/auth.controller.js'


  const authRouter= express.Router()

  authRouter.post('/signin',Login)
  authRouter.get('/logout',Logout)
  authRouter.post('/signup',signup)
  authRouter.post('/google',googleLogin)


  export default authRouter