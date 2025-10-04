import { configureStore } from '@reduxjs/toolkit'
//import {userslice} from './slice/user.slice'   //{userslice} not usable because we export default so import default like userslice
import userslice from './slice/user/user.slice'
import  messageslice  from './slice/message/message.slice'
import  socketslice  from './slice/socket/socket.slice'
export const store = configureStore({
  reducer: {
   userslice,messageslice,socketslice

  },
  middleware:(getdefaultmiddleware)=>
         getdefaultmiddleware({
          serializableCheck:{
            ignoredPaths:["socketslice.socket"]
          }
         })
  
})