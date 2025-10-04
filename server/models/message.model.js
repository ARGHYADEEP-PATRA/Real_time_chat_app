import mongoose from "mongoose";

const messageschema=new mongoose.Schema({
    senderid:{
        type:mongoose.Schema.Types.ObjectId, //object id of mongodb
        ref:'User',
        required:true,
    },
    receiverid:{
        type:mongoose.Schema.Types.ObjectId, //object id of mongodb
        ref:'User',
        required:true,

    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true})


export default mongoose.model("Message",messageschema)