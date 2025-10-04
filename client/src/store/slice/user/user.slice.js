import { createSlice } from '@reduxjs/toolkit'
import { getotheruserthunk, getuserprofilethunk, loginuserthunk, logoutuserthunk, registeruserthunk } from './user.thunk'




const initialState={
  isauthenticated:false,
  screenloading:true,
  buttonloading:false,
  userprofile:null,
  otherUsers:null,
  copyotherUsers:null,
  selectedUser:JSON.parse(localStorage.getItem("selectedUser")),

}


export const  userslice=createSlice({
    name:"user",
    initialState,
    reducers:{
       setSelectedUser:(state,action)=>{
              localStorage.setItem("selectedUser",JSON.stringify(action.payload))
              state.selectedUser=action.payload
              // state.selectedUser=action.payload
       },
       searchOtherusers:(state,action)=>{
           state.copyotherUsers=state.otherUsers.filter((user)=>user.fullname.toLowerCase().includes(action.payload.toLowerCase()))
       }
    },
    extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    //Login
    builder.addCase(loginuserthunk.fulfilled, (state, action) => {
      
      // console.log("fullfilled")
      // console.log("login data",action.payload);
      state.userprofile=action.payload?.responsedata?.user
      state.buttonloading=false
      state.isauthenticated=true
    })
    builder.addCase(loginuserthunk.pending, (state, action) => {
      
      // console.log("pending")
      state.buttonloading=true
    })
    builder.addCase(loginuserthunk.rejected, (state, action) => {
      state.buttonloading=false
      //  console.log("rejected")
    })


    //Logout
    builder.addCase(logoutuserthunk.pending, (state, action) => {
      
      // console.log("pending")
      state.buttonloading=true
    })
    builder.addCase(logoutuserthunk.fulfilled, (state, action) => {
      
      // console.log("fullfilled")
      // console.log(action.payload);
       state.userprofile=null
       state.isauthenticated=false
      state.buttonloading=false
      state.isauthenticated=true
      state.selectedUser=null
      state.otherUsers=null
      localStorage.removeItem('selectedUser');
      
    })
    builder.addCase(logoutuserthunk.rejected, (state, action) => {
      state.buttonloading=false
      //  console.log("rejected")
    })




    //Registeruser
    builder.addCase(registeruserthunk.pending, (state, action) => {
          
    // console.log("pending")
    state.buttonloading=true
        })
    builder.addCase(registeruserthunk.fulfilled, (state,action) => {
      
      // console.log("fullfilled")
      // console.log(action.payload);
      state.userprofile=action.payload?.responsedata?.user
      state.buttonloading=false
      state.isauthenticated=true
    })
    builder.addCase(registeruserthunk.rejected, (state, action) => {
      state.buttonloading=false
      //  console.log("rejected")
    })



    //Get-Profile
    builder.addCase(getuserprofilethunk.pending, (state, action) => {
      
      // console.log("pending")
      // state.buttonloading=true
      // state.screenloading=true;
    })
    builder.addCase(getuserprofilethunk.fulfilled, (state, action) => {
      
      // console.log("fullfilled")
      // console.log(action.payload);
      state.userprofile=action.payload?.responsedata
      state.screenloading=false
      state.isauthenticated=true
      // console.log(action.payload)
    })
    builder.addCase(getuserprofilethunk.rejected, (state, action) => {
      state.screenloading=false
      //  console.log("rejected")
    })
    
    
    
    //Get-other-users
    builder.addCase(getotheruserthunk.pending, (state, action) => {
      
      // console.log("pending")
      // state.buttonloading=true
      // state.screenloading=true;
    })
    builder.addCase(getotheruserthunk.fulfilled, (state, action) => {
      
      // console.log("fullfilled")
      // console.log("other users",action.payload);
      state.otherUsers=action.payload?.responsedata
      state.copyotherUsers=action.payload?.responsedata
      state.screenloading=false
      state.isauthenticated=true
      // console.log(action.payload)
    })
    builder.addCase(getotheruserthunk.rejected, (state, action) => {
      state.screenloading=false
      //  console.log("rejected")
    })


  },

})

// Action creators are generated for each case reducer function
export const { setSelectedUser,searchOtherusers } = userslice.actions

export default userslice.reducer