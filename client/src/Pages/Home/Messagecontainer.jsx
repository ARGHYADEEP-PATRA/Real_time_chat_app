import React, { useEffect, useState } from 'react'
import User from './User'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { getmessagesthunk, sendmessagethunk } from '../../store/slice/message/message.thunk'
function Messagecontainer() {
    const [usermessage, setusermessage] = useState("")
    const { selectedUser } = useSelector(state => state.userslice)
    const { messages } = useSelector(state => state.messageslice)
    // console.log("message container message", messages)
    // console.log(selectedUser)
    const dispatch = useDispatch();
    useEffect(() => {
        if (selectedUser) {
            dispatch(getmessagesthunk({ receiverid: selectedUser?._id, }))
        }
    }, [selectedUser])

    const sendmessagenow = () => {
        if (usermessage != "") {
            dispatch(sendmessagethunk({ message: usermessage, receiverid: selectedUser?._id, }))
            // dispatch(getmessagesthunk({ receiverid: selectedUser?._id, }))
            setusermessage("")
        }
    }

    const sendmessagenowbyenter=(e)=>{
         if(e.key==='Enter')
         {
            sendmessagenow()
         }
    }

    return (
        <>
            {!selectedUser &&
                <div className='h-screen w-full flex flex-col items-center justify-center '>
                    <p className='text-[20px]'>Welcome to gupshup</p>
                    <p className='text-[30px]'>Please selact a person to continue</p>

                    
                </div>
            }



            {selectedUser&&
            
            <div className=' h-screen w-full flex flex-col' >
                <div className='p-3 border-b border-b-white/10'>
                    <User item={selectedUser} />
                </div >

                <div className='p-3 overflow-auto h-[80vh]'>

                    {
                        messages &&
                        messages.map((item) => <Message messagedata={item} key={item._id} />)
                    }
                </div>

                <div className='h-[5rem] border-t border-t-white/10 pt-3 flex'>
                    <input type="text" placeholder="Message here" className="input w-full   " value={usermessage} onChange={(e) => { setusermessage(e.target.value) }} onKeyDown={sendmessagenowbyenter}/>
                    <button className="btn btn-primary mx-3" onClick={sendmessagenow}>Send</button>


                </div>
            </div >
            }
        


        </>
    )
}

export default Messagecontainer
