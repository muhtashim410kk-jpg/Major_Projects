
  import express from 'express'
import getCurrentUser, { asktoAssitant, updateAssistant, createNewChat,deleteChat } from '../controllers/user.controller.js'
import isAuth from '../middlewares/isAuth.js'
import upload from '../middlewares/multer.js'

  const currentuserRouter = express.Router()


  currentuserRouter.get('/current',isAuth,getCurrentUser)
  currentuserRouter.post('/update',isAuth, upload.single("assistantImage"),updateAssistant)
  currentuserRouter.post('/asktoassistant',isAuth,asktoAssitant)
  currentuserRouter.post('/new-chat', isAuth, createNewChat)
  currentuserRouter.delete('/delete-chat/:chatId', isAuth, deleteChat)


  export default currentuserRouter