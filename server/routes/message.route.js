import express from 'express'
import { getprofile, login, logout, register } from '../controller/user.controller.js'
import { isauthenticated } from '../middlewares/auth.middleware.js'
import { getmessages, sendmessage } from '../controller/message.controller.js'

const router=express.Router()



router.post('/send/:receiverid',isauthenticated,sendmessage)
router.get('/get-messages/:otherparticipantsid',isauthenticated,getmessages)





export default router;