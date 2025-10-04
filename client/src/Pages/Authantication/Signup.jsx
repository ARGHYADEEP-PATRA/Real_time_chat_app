import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdMailOpen } from "react-icons/io";
import { TbLockPassword } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registeruserthunk } from '../../store/slice/user/user.thunk';
import { LuEyeClosed } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
function Signup() {

     const {isauthenticated}=useSelector(state=>state.userslice)
    const nevigate=useNavigate();
    const [showPassword, setshowPassword] = useState(false)

    function showpasswordcontrol() {

        setshowPassword(prev => !prev)
    }

    const dispatch = useDispatch();
    const [signupdata, setsignupdata] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmpassword: "",
        gender:"male"



    })

        useEffect(()=>{
            if(isauthenticated)
            {
                nevigate("/")
            }
        },[isauthenticated])

    // console.log(signupdata)

    const handleinputchange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setsignupdata({ ...signupdata, [e.target.name]: e.target.value })
    }


    const handlesignup = async () => {
        if(signupdata.password !== signupdata.confirmpassword)
        {
           return  toast.error("Password and confirm password do not matched")
        }
        const response=await dispatch(registeruserthunk(signupdata))
        // console.log(response)
        if(response?.payload?.success)
        {
            nevigate("/")
        }
    }




    return (
        <>
            <div className='flex justify-center items-center p-6 min-h-screen  '>
                <div className='max-w-[40rem] flex flex-col gap-5 bg-base-200 p-6 rounded-lg '>
                    <h2 className='text-lg text-green-200 '>Please Signup..!!</h2>


                    <div>
                        <label className="input validator">
                            <FaRegUserCircle />
                            <input
                                name='fullname'
                                type="text"
                                required
                                placeholder="Full Name"
                                minLength="3"
                                maxLength="30"
                                title="Only letters"
                                onChange={handleinputchange}
                            />
                        </label>
                    </div>


                    <div>
                        <label className="input validator">
                            <FaRegUserCircle />
                            <input
                                name="username"
                                type="text"
                                required
                                placeholder="Username"
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
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="Password"
                                minLength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                onChange={handleinputchange}
                            />
                            <span onClick={showpasswordcontrol}
                                className='cursor-pointer'>
                                {showPassword ? <FaEye /> : <LuEyeClosed />}
                            </span>
                        </label>
                        <p className="validator-hint hidden">
                            Must be more than 8 characters, including
                            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                        </p>
                    </div>

                    <div>
                        <label className="input validator">

                            <TbLockPassword />
                            <input
                                name="confirmpassword"
                                type="password"
                                required
                                placeholder="Confirm Password"
                                minLength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                onChange={handleinputchange}
                            />
                        </label>
                        <p className="validator-hint hidden">
                            Must be more than 8 characters, including
                            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                        </p>
                    </div>




                    <div className='flex gap-8 '>
                        <div className='flex gap-2'>
                        <input type="radio" name="gender" className="radio radio-primary" value="male" onChange={handleinputchange} />
                        <p>Male</p>
                        </div>
                        <div className='flex gap-2'>
                        <input type="radio" name="gender" className="radio radio-primary" value="female" onChange={handleinputchange} />
                        <p>Female</p>
                        </div>
                 
                    </div>

                      



                    <button className="btn btn-active btn-primary" onClick={handlesignup}>Sign up</button>

                    <p>Already have an account? &nbsp;<Link to="/login" className='text-blue-400 underline'>Log In</Link></p>
                </div>
            </div>
        </>
    )
}

export default Signup
