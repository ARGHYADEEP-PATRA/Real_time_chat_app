import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,

    },
    username:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,

    },
    gender:{
        type:String,
        required:true,

    },
    avtar:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
})


const User=mongoose.model("User",userschema)

export default User;