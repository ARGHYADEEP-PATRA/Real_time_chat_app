import {createSlice} from '@reduxjs/toolkit'

import io from 'socket.io-client'


const initialState={
       socket:null,
       onlineUsers:null,
}


export const socketslice=createSlice({
    name:'socket',
    initialState,
    reducers:{
     initializeSocket:(state,action)=>{
        // console.log("socker slfka",action)
         const socket = io(import.meta.env.VITE_DB_ORIGIN, {
            query: {
               userId: action.payload,
            },
         })
         state.socket=socket
        //  socket.on("onlineUsers",(onlineUsers)=>{
        //     // console.log(onlineUsers)
        //     state.onlineUsers=onlineUsers
        //  })
     },
     setonlineusers:(state,action)=>{
        state.onlineUsers=action.payload
     }

    }

})



export const {initializeSocket,setonlineusers}=socketslice.actions
export default socketslice.reducer
