import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

function Message({messagedata}) {
    const {selectedUser}=useSelector(state=>state.userslice)
    const {userprofile}=useSelector(state=>state.userslice)
    // console.log("messagedata user",messagedata)
    // console.log("userprofile user",userprofile)
    // console.log("selected user",selectedUser)

    const messageRef=useRef(null)

    useEffect(()=>{
    if(messageRef.current)
    {
        messageRef.current.scrollIntoView({behaviour:'smooth'})
    }
    },[])
    
    
    return (
        <div>
            <div ref={messageRef}   className={`chat ${messagedata?.senderid===userprofile?._id?"chat-end":"chat-start"}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            // src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                            // src={userprofile?.avtar}
                            src={messagedata?.senderid===userprofile?._id ? userprofile?.avtar:selectedUser?.avtar}
                        />
                    </div>
                </div>
                <div className="chat-header">
                  
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{messagedata.message}</div>
                <div className="chat-footer opacity-50">Delivered</div>
            </div>
        </div>
    )
}

export default Message
