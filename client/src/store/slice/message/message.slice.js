import { createSlice } from "@reduxjs/toolkit"
import { getmessagesthunk, sendmessagethunk } from "./message.thunk"

const initialState={
     messages:null,
     buttonloading:false,
     screenloading:false,

}


export const messageslice=createSlice({
    name:"message",
    initialState,
    reducers:{
        setnewMessage:(state,action)=>{
            if(!state.messages)
            {
               state.messages=[]
            }
            state.messages=[...state.messages,action.payload]
        }

    },
    extraReducers:(builder)=>{
         //message send
        builder.addCase(sendmessagethunk.pending,(state,action)=>{

         })

        builder.addCase(sendmessagethunk.fulfilled,(state,action)=>{
            // console.log(action.payload)
            if(!state.messages)
            {
               state.messages=[]
            }
            state.messages=[...state.messages,action?.payload]
         })

        builder.addCase(sendmessagethunk.rejected,(state,action)=>{
            
         })



        //  messages get
         builder.addCase(getmessagesthunk.pending,(state,action)=>{

         })

        builder.addCase(getmessagesthunk.fulfilled,(state,action)=>{
            // console.log("fulfilled",action?.payload)
            state.messages=action.payload?.responsedata?.messages
         })

        builder.addCase(getmessagesthunk.rejected,(state,action)=>{
            
         })
    }
})


export const {setnewMessage}=messageslice.actions
export default messageslice.reducer
