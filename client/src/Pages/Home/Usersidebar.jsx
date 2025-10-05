import React, { useEffect, useState } from 'react'
import { MdOutlineSearch } from "react-icons/md";
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { getotheruserthunk, getuserprofilethunk, logoutuserthunk } from '../../store/slice/user/user.thunk';
import { useNavigate } from 'react-router-dom';
import { searchOtherusers } from '../../store/slice/user/user.slice';

function Usersidebar() {
    // const [searchvalue,setsearchvalue]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handlelogout=async ()=>{
       try{
        //  e.preventDefault()
         await dispatch(logoutuserthunk())
         navigate("/")
       }catch(err)
       {
        console.log("logout error",err)
       }
    }

   


    const {copyotherUsers,userprofile}=useSelector(state=>state.userslice)
    // console.log(userprofile)

    useEffect(()=>{
        (async()=>{await dispatch(getotheruserthunk())})()
    },[])


    const searchuser=(e)=>{
      dispatch(searchOtherusers(e.target.value))
    }

    return (
        <>
            <div className='min-w-[20rem] h-screen  flex flex-col border-r border-r-white/10 '>
                <div>
                    <h1 className='text-[#5754E8] text-xl font-semibold'>GUP SHUP</h1>

                </div>
                <div className='p-3'>
                    <label className="input p-3">
                        <MdOutlineSearch />
                        <input type="search" className="grow" placeholder="Search" onChange={searchuser}/>

                    </label>

                </div>
                <div className='h-full overflow-auto flex flex-col' >
                    {
                        copyotherUsers?.map((item)=>{
                        return <User item={item} key={item._id}/>
                    }
                    )
                    }
                    {/* <User />
                    <User />
                    <User /> */}



                </div>
                <div className='h-[3rem] bg-gray-900 flex'>
                    <div className="avatar p-1">
                        <div className="mask mask-heart w-12">
                            <img src={userprofile?userprofile.avtar:"#"} />
                        </div>
                    </div>
                    <div className='text-white w-[10rem] p-1 pl-3 '>
                        <h1 className='line-clamp-1'>{userprofile?userprofile.fullname:"User"}</h1>
                        <p className='text-xs'>{userprofile?userprofile.username:"User"}</p>

                    </div>
                    <div className='p-1'>
                        <button onClick={handlelogout} className="btn btn-primary">Log out</button>
                    </div>

                </div>



            </div>
        </>
    )
}

export default Usersidebar
