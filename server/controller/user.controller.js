import { response } from "express"
import User from "../models/user.model.js"
import { asynchandler } from "../utilities/asynchandler.utility.js"
import { errorhandler } from "../utilities/errorhandler.utility.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = asynchandler(async (req, res, next) => {

        const { fullname, username, password, gender } = req.body

        if (!fullname || !username || !password || !gender) {
                // res.status(400).json({
                //    success:false,
                //    message:"all fields are required",
                // })
                return next(new errorhandler("all fields are required", 400))
        }
        const user = await User.findOne({ username })

        if (user) {
                return next(new errorhandler("user already exists ", 400))
        }

        const avtartype = gender === 'male' ? 'boy' : 'girl'

        const avtar = `https://avatar.iran.liara.run/public/${avtartype}?username=${username}` 

        const hashpassword = await bcrypt.hash(password, 10)

        // const newuser=new User({fullname,username,password,gender,avtar})
        const newuser = await User.create({
                fullname,
                username,
                password: hashpassword,
                gender,
                avtar

        })

        const tokendata = {
                _id: newuser._id,

        }



        // const token=jwt.sign(data,secret,expires)  **structure of jwt token

        const token = jwt.sign(tokendata, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

        res
                .status(200)
                .cookie("token",token, {               //one parameter is missing we will fix it later
                        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                        httpOnly: true,
                        secure:true,
                        sameSite: "None"


                })
                .json({
                        success: true,
                        responsedata: {
                                newuser,
                                token
                        }
                })
       




})


export const login = asynchandler(async (req, res, next) => {

        const { username, password } = req.body

        if (!username || !password) {
                // res.status(400).json({
                //    success:false,
                //    message:"all fields are required",
                // })
                return next(new errorhandler("Please enter valid username or password", 400))
        }
        const user = await User.findOne({ username })

        if (!user) {
                return next(new errorhandler("Please enter valid username or password ", 400))
        }


        const isvalidpassword = await bcrypt.compare(password, user.password)

        if (!isvalidpassword) {
                return next(new errorhandler("Please enter valid username or password ", 400))
        }



        const tokendata = {
                _id: user._id,

        }



        // const token=jwt.sign(data,secret,expires)  **structure of jwt token
        

        const token = jwt.sign(tokendata, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })


        res
                .status(200)
                .cookie("token",token, {               //one parameter is missing we will fix it later
                        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                        httpOnly: true,
                        secure:true,
                        sameSite: "None"


                })
                .json({
                        success: true,
                        responsedata: {
                                user,
                                token

                        }
                })
      




})



export const getprofile = asynchandler(async (req, res, next) => {

      

       const userid=req.user._id

       const profile=await User.findById(userid)

       res.status(200)
       .json({
        success:true,
        responsedata:profile,
       })




})

export const logout = asynchandler(async (req, res, next) => {

      

       res.
       status(200)
       .cookie("token","", {               //one parameter is missing we will fix it later
                        expires: new Date(Date.now()),
                        httpOnly: true,
                       


                })
       .json({
        success:true,
        message:"logout successful"
       
       })




})



export const getotherusers = asynchandler(async (req, res, next) => {

      const otherusers=await User.find({_id:{$ne:req.user._id}})

       res.
       status(200)
      
       .json({
        success:true,
        responsedata:otherusers,
       
       })




})
//make token send utility for not do repetative task
