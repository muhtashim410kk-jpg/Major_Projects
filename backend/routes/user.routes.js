
  import express from 'express'
import { Login, Logout, signup } from '../controllers/auth.controller.js'


  const authRouter= express.Router()

  authRouter.post('/signin',Login)
  authRouter.get('/logout',Logout)
  authRouter.post('/signup',signup)


  export default authRouter