import dotenv from 'dotenv'
dotenv.config()
import {Server} from 'socket.io'
import http from 'http'
import express from 'express'
// import { useEffect } from 'react'

const app=express()
const server=http.createServer(app)
// console.log(process.env.CLIENT_URL)
const io=new Server(server,{cors:{origin:process.env.CLIENT_URL}})

 const usersocketMap={
       //userid:socketid

}

const getsocketid=(user_id)=>
{
   return usersocketMap[user_id]
}

io.on('connection',(socket)=>{
       // console.log(socket.id)
       // console.log(socket)
       const userId=socket?.handshake?.query?.userId
       // console.log(userId)
       if(!userId) return
       usersocketMap[userId]=socket.id
         console.log(Object.keys(usersocketMap))
       io.emit("onlineUsers",Object.keys(usersocketMap))

       socket.on('disconnect',()=>{
              delete usersocketMap[userId]
              io.emit('onlineUsers',Object.keys(usersocketMap))
       })
})

export {app,io,server,getsocketid}