import React, { useEffect } from 'react'
import Usersidebar from './Usersidebar'
import Messagecontainer from './Messagecontainer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocket, setonlineusers } from '../../store/slice/socket/socket.slice'
import { setnewMessage } from '../../store/slice/message/message.slice'
import { useNavigate } from 'react-router-dom'

function Home() {
    //writing the socket logic because when login done then we come in home page
    const dispatch=useDispatch()
    const {isauthenticated,userprofile}=useSelector(state=>state.userslice)
    const {socket}=useSelector(state=>state.socketslice)
    // console.log(userprofile?._id)
    // console.log("see dasfad",isauthenticated,userprofile)
    // const navigate=useNavigate()


    // useEffect(() => {
    //     if (!isauthenticated) {
    //         console.log('nevigate to login',isauthenticated)
    //         navigate("/login");
    //     }
    // }, [isauthenticated, navigate]);


    //     useEffect(() => {
    //     if (isauthenticated === false) {
    //         console.log("🚀 User logged out, navigating to login");
    //         navigate("/login", { replace: true });
    //     }
    // }, [isauthenticated, navigate]);

    

    useEffect(()=>{
       if(!isauthenticated) return
       if(!userprofile) return 
       dispatch(initializeSocket(userprofile?._id))
    },[isauthenticated,userprofile])

    useEffect(()=>{
        if(!socket) return
        socket.on("onlineUsers",(onlineUsers)=>{
            // console.log(onlineUsers)
            // state.onlineUsers=onlineUsers
            dispatch(setonlineusers(onlineUsers))
         })
        socket.on("newmessage",(newmessage)=>{
            // console.log(onlineUsers)
            // state.onlineUsers=onlineUsers
            // dispatch(setonlineusers(newmessage))
            // console.log(newmessage)
            dispatch(setnewMessage(newmessage))
         })
         return ()=>{
            socket.close()
         }
    },[socket])
    return (
        <>
        <div className='flex'>
        <Usersidebar/>
        <Messagecontainer/>

        </div>
        </>
    )
}

export default Home
