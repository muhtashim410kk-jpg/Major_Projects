
  import express from 'express'
import getCurrentUser from '../controllers/user.controller.js'

  const currentuserRouter = express.Router()


  currentuserRouter.get('/current',getCurrentUser)

  export default currentuserRouter