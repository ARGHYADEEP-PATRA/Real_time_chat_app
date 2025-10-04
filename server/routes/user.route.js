import express from 'express'
import { getotherusers, getprofile, login, logout, register } from '../controller/user.controller.js'
import { isauthenticated } from '../middlewares/auth.middleware.js'

const router=express.Router()

router.post('/login',login)

router.post('/register',register)

router.get('/get-profile',isauthenticated,getprofile)

router.post('/logout',isauthenticated,logout)

router.get('/get-other-users',isauthenticated,getotherusers)

export default router;