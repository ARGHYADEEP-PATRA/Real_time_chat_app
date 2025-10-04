import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../../store/slice/user/user.slice'

function User({item}) {
 
    // console.log("props",item)
    const dispatch=useDispatch()
    const {selectedUser}=useSelector(state=>state.userslice)
    const {onlineUsers}=useSelector(state=>state.socketslice)


    const handleclick=()=>{
         dispatch(setSelectedUser(item))
         
    }

    const isonline=onlineUsers?.includes(item?._id)

    // console.log("selectedUser",selectedUser)
    
    
    return (
        <>
        {!item &&
          <div>Loading...</div>
        }
        {
            item &&
            <div className={`p-2 flex flex-row gap-5 hover:bg-gray-700 rounded-lg cursor-pointer ${item?._id===selectedUser?._id && "bg-gray-700"}`} onClick={handleclick}>
                <div className={`avatar ${isonline&&'avatar-online'}`}>
                    <div className="w-12 rounded-full">
                        <img src={item.avtar} />
                    </div>
                </div>
                <div>
                    <h1 className='line-clamp-1'>{item.fullname}</h1>
                    <p className='text-xs mt-1'>{item.username}</p>
                </div>
                
            </div>
        }
        </>
    )
}

export default User
