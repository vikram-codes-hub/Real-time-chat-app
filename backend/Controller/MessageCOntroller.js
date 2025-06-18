import Message from "../models/message.js"
import User from '../models/User.js'
import cloudinary from '../lib/CLoudinary.js'

import {io, UserSocketMap} from '../server.js'


//Get all users except the  loggedin users


export const getUsersForSidebar=async(req,res)=>{
    try {
     const userId=req.user._id
     const filteredUsers=await User.find({_id:{$ne:userId}}).select("-password")

     //count number of unseen messages
     const unseenmessages={}
     const promises=filteredUsers.map(async(user)=>{
      const messages=await Message.find({senderId:user._id,reciverId:userId,seen:false})
      if(messages.length>0){
        unseenmessages[user._id]=messages.length
      }
     })
     await Promise.all(promises)

     res.json({success:true,users:filteredUsers,unseenmessages})
    } catch (error) {
      console.log(error)
       res.json({ success: false, message: error.message });

    }
}


//get all messages for selected users

export const getMessages=async(req,res)=>{
  try {
    const {id:selectedUserId}=req.params;
  const myId=req.user._id

  const messages=await Message.find({
    $or:[
      {senderId:myId,reciverId:selectedUserId},
      {senderId:selectedUserId,reciverId:myId}
    ]
  })

  await Message.updateMany({senderId:selectedUserId,reciverId:myId},{seen:true})

  res.json({success:true,messages})
  } catch (error) {
      console.log(error)
       res.json({success:false,messages:error.messages})
    }
}


//api to mark message as seen using mesage id
export const markMessageseen=async(req,res)=>{
  try {
    const{id}=req.params
    await Message.findByIdAndUpdate(id,{seen:true})

    res.json({success:true})

  } catch (error) {
      console.log(error)
       res.json({success:false,messages:error.messages})
    }
}

//send message to selected user

export const sendmessage = async (req, res) => {
  try {
    const { text, image } = req.body;

    const reciverId = req.params.id;
    const senderId = req.user._id;

    let imageurl;
    let message; // ✅ Define message here so it's accessible later

    if (image) {
      const uploadeResp = await cloudinary.uploader.upload(image);
      imageurl = uploadeResp.secure_url;
    }

    message = await Message.create({
      senderId,
      reciverId,
      text,
      image: imageurl
    });

    // Emit the message to the receiver's socket
    const reciversocketId = UserSocketMap[reciverId];
    if (reciversocketId) {
      io.to(reciversocketId).emit("newMessage", message);
    }

    res.json({ success: true, message });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
