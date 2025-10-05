import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoMdMailOpen } from "react-icons/io";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { getotheruserthunk, loginuserthunk } from '../../store/slice/user/user.thunk';
import { LuEyeClosed } from "react-icons/lu";


const Login = () => {
    
    const {isauthenticated}=useSelector(state=>state.userslice)


    const nevigate=useNavigate()

    const dispatch = useDispatch();

    const [logindata, setlogindata] = useState({
        username: "",
        password: ""
    })

    useEffect(()=>{
        if(isauthenticated)
        {
            nevigate("/home")
            dispatch(getotheruserthunk())
        }
    },[isauthenticated])


    const handleinputchange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setlogindata({ ...logindata, [e.target.name]: e.target.value })
    }

    //    console.log(logindata)
    const handleLogin = async () => {
        // toast.success("Login Successful")
        //  console.log("login")
      const response=  await dispatch(loginuserthunk(logindata))
        if(response?.payload?.success)
        {
            nevigate("/home")
        }
    }

    const [showPassword,setshowPassword]=useState(false);

    function togglePassword(){
        setshowPassword(prev=>!prev);
    }



    return (
        <>
            <div className='flex justify-center items-center p-6 min-h-screen  '>
                <div className='max-w-[40rem] flex flex-col gap-5 bg-base-200 p-6 rounded-lg '>
                    <h2 className='text-lg text-green-200 '>Please Login..!!</h2>
                    <div>
                        <label className="input validator">
                            <FaRegUserCircle />
                            <input
                                type="text"
                                required
                                placeholder="Username"
                                name='username'
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength="3"
                                maxLength="30"
                                title="Only letters, numbers or dash"
                                onChange={handleinputchange}
                            />
                        </label>

                    </div>





                    <div>
                        <label className="input validator">

                            <TbLockPassword />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="Password"
                                name='password'
                                minLength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"

                                onChange={handleinputchange}
                            />
                            <span
                                onClick={togglePassword}
                                className="cursor-pointer"
                            >
                                {showPassword ? <FaEye /> : <LuEyeClosed />}
                            </span>

                        </label>
                        <p className="validator-hint hidden">
                            Must be more than 8 characters, including
                            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                        </p>
                    </div>

                    <button onClick={handleLogin} className="btn btn-active btn-primary">Log in</button>

                    <p>Don't have an account? &nbsp;<Link to="/signup" className='text-blue-400 underline'>Sign Up</Link></p>
                </div>
            </div>
        </>
    )
}

export default Login
