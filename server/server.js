
import {app,server} from './socket/socket.js'
import express from 'express';
import { connectDB } from './db/connection1.db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'




connectDB()

// const app=express();

app.use(cors({
   origin:[process.env.CLIENT_URL],
   credentials:true,
   // allowedHeaders:["Content-Type","Authorization"],
   // methods:["GET","POST","PUT","DELETE"]
}))
app.use(express.json())  //in case of express we must do parse the json data so we use the middleware express.json to parse the data not manually parse the data
app.use(cookieParser())




const PORT=process.env.PORT;


//routes
import userroute from './routes/user.route.js'
import messageroute from './routes/message.route.js'
app.use('/api/v1/user',userroute) //middleware  **in middle of request and response middleware are working
app.use('/api/v1/message',messageroute)
 



//middleware
import { errormiddleware } from './middlewares/error.middleware.js';
app.use(errormiddleware); 

server.listen(PORT,()=>
{
   console.log(`hey welcome our server our server run at ${PORT}`)  
})


