
  import express from 'express'
import getCurrentUser from '../controllers/user.controller.js'
import isAuth from '../middlewares/isAuth.js'

  const currentuserRouter = express.Router()


  currentuserRouter.get('/current',isAuth,getCurrentUser)

  export default currentuserRouter