import { response } from "express"
import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"
import { asynchandler } from "../utilities/asynchandler.utility.js"
import { errorhandler } from "../utilities/errorhandler.utility.js"
import mongoose from "mongoose"
import { io, getsocketid } from "../socket/socket.js"

export const sendmessage = asynchandler(async (req, res, next) => {


    const senderid = req.user._id;
    const receiverid = req.params.receiverid;
    const message = req.body.message;


    // console.log(senderid,receiverid,message)

    if (!senderid || !receiverid || !message) {
        return next(new errorhandler("all fields are required", 400))
    }

    let conversation = await Conversation.findOne(
        {
            participants: { $all: [senderid, receiverid] },
        }


    )
    // console.log(`convertion first ${conversation}`)

    if (conversation == null) {
        // console.log("conversion create")
        conversation = await Conversation.create({
            participants: [senderid, receiverid],
        })
    }


    const newmessage = await Message.create(
        {
            senderid,
            receiverid,
            message,
        }
    )


    if (newmessage) {
        conversation.messages.push(newmessage._id)
        await conversation.save()
    }
    //   console.log(conversation)
    //socket.io implementation
    const socketid=getsocketid(receiverid)
    io.to(socketid).emit('newmessage',newmessage)


    res
        .status(200)

        .json({
            success: true,
            responsedata: newmessage,
        })





})





export const getmessages = asynchandler(async (req, res, next) => {


    const myid = req.user._id;
    const otherParticipantsId = req.params.otherparticipantsid;





    if (!myid || !otherParticipantsId) {
        return next(new errorhandler("all fields are required", 400))
    }

    let conversation = await Conversation.findOne(
        {
            participants: { $all: [myid,otherParticipantsId] },
        }


    ).populate("messages")


  







    //socket.io implementation

    res
        .status(200)

        .json({
            success: true,
            responsedata: conversation,
        })





})