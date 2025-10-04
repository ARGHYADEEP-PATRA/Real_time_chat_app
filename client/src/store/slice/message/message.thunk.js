import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../componants/utilitys/axiosinstance";
import toast from "react-hot-toast";


export const sendmessagethunk=createAsyncThunk("message/send",
    async({receiverid,message},{rejectWithValue})=>{
       try{

          const response=await axiosInstance.post(`/message/send/${receiverid}`,{
                message
          })
        //   console.log(response)
          return response?.data?.responsedata

       }catch(err)
       {
        console.error(err)
        const erroutput=err?.response?.data?.errmessage
        toast.error(erroutput)
        return rejectWithValue(erroutput)
       }
    }
)




export const getmessagesthunk=createAsyncThunk("message/get",
    async({receiverid},{rejectWithValue})=>{
       try{

          const response=await axiosInstance.get(`/message/get-messages/${receiverid}`)
        //   console.log("response",response)
          return response?.data

       }catch(err)
       {
        console.error(err)
        const erroutput=err?.response?.data?.errmessage
        toast.error(erroutput)
        return rejectWithValue(erroutput)
       }
    })
