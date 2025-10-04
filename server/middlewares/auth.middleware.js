import { asynchandler } from "../utilities/asynchandler.utility.js";
import { errorhandler } from "../utilities/errorhandler.utility.js";
import jwt from 'jsonwebtoken'
export const isauthenticated= asynchandler(async (req,res,next)=>{
    const token=req.cookies.token || req.headers["authorization"].replace("Bearer ","")

    if(!token)
    {
        return next(new errorhandler("Invalid token",400))
    }
   

    const tokendata=jwt.verify(token,process.env.JWT_SECRET)
   
    req.user=tokendata


    next()
})