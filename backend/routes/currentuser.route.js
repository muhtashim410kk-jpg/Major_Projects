
  import express from 'express'
import getCurrentUser, { updateAssistant } from '../controllers/user.controller.js'
import isAuth from '../middlewares/isAuth.js'
import upload from '../middlewares/multer.js'

  const currentuserRouter = express.Router()


  currentuserRouter.get('/current',isAuth,getCurrentUser)
  currentuserRouter.post('/update',isAuth, upload.single("assistantImage"),updateAssistant)


  export default currentuserRouter