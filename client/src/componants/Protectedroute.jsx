import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protectedroute({children}) {

    const {isauthenticated,screenloading}=useSelector(state=>state.userslice)
    const nevigate=useNavigate();
    

    useEffect(()=>{
        // console.log(isauthenticated,screenloading)
      if(!isauthenticated&&!screenloading)
      {
        nevigate("/login")
      }
    //   console.log("isauth",isauthenticated)
    },[isauthenticated,screenloading])
    return (
        children
    )
}

export default Protectedroute
