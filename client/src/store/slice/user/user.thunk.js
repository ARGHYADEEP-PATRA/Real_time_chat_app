import { createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import { axiosInstance } from '../../../componants/utilitys/axiosinstance';


// First, create the thunk
export const loginuserthunk = createAsyncThunk(
  'users/login',
  async ({username,password},{rejectWithValue}) => {
    try {
           const response=await axiosInstance.post('/user/login',{
                  username,
                  password
           })
          //  console.log(response)
           toast.success("Login Successful")
           return response.data
    }
    catch (error) {
      console.error(error)
       const erroroutput=error?.response?.data?.errmessage
       toast.error(erroroutput)

      return rejectWithValue(erroroutput)
    }

  },
)


export const registeruserthunk = createAsyncThunk(
  'users/signup',
  async ({fullname,username,password,gender},{rejectWithValue}) => {
    try {
           const response=await axiosInstance.post('/user/register',{
                  fullname,
                  username,
                  password,
                  gender
           })
          //  console.log(response)
          toast.success("Account Created Successfully ")
           return response.data
    }
    catch (error) {
      console.error(error)
       const erroroutput=error?.response?.data?.errmessage
       toast.error(erroroutput)

      return rejectWithValue(erroroutput)
    }

  },
)


export const logoutuserthunk = createAsyncThunk(
  'users/logout',
  async (_,{rejectWithValue}) => {
    try {
           const response=await axiosInstance.post('/user/logout')
          //  console.log(response)
          toast.success("Logout Successful ")
           return response.data
    }
    catch (error) {
      console.error(error)
       const erroroutput=error?.response?.data?.errmessage
       toast.error(erroroutput)

      return rejectWithValue(erroroutput)
    }

  },
)



export const getotheruserthunk = createAsyncThunk(
  'users/getotherusers',
  async (_,{rejectWithValue}) => {
    try {
           const response=await axiosInstance.get('/user/get-other-users')
          //  console.log(response)
          // toast.success("Account Created Successfully ")
           return response.data
    }
    catch (error) {
      console.error(error)
       const erroroutput=error?.response?.data?.errmessage
      //  toast.error(erroroutput)

      return rejectWithValue(erroroutput)
    }

  },
)



export const getuserprofilethunk = createAsyncThunk(
  'users/getprofile',
  async (_,{rejectWithValue}) => {
    try {
           const response=await axiosInstance.get('/user/get-profile')
          //  console.log(response)
          // toast.success("Account Created Successfully ")
           return response.data
    }
    catch (error) {
      console.error(error)
       const erroroutput=error?.response?.data?.errmessage
      //  toast.error(erroroutput)

      return rejectWithValue(erroroutput)
    }

  },
)