import express from 'express'
import "dotenv/config"
import http from 'http'
const app=express()
import cors from "cors"
import { connectDb } from './lib/db.js'
import userRouter from './Routes/UserRoute.js'
import messageRouter from './Routes/Messageroute.js'
import { Server } from 'socket.io'

const server=http.createServer(app)

//middelware setup
app.use(express.json({limit:"4mb"}))//upload images limit 4mb
app.use(cors()) 


export const io = new Server(server, {
    cors: { origin: "*" }  // ✅ Correct spelling: cors
});


//STORE ONLINE USERS

export const UserScoketMap={}  //{UserId: SocketId}

//Socket.io connection hgandeller

io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId
    console.log("User connected",userId)
    
    if(userId) UserScoketMap[userId]=socket.id

    //Emit online users to all connected clients
    io.emit("getOnlineUsers",Object.keys(UserScoketMap))

    socket.on("disconnect",()=>{
        console.log("User Disconnected", userId)
        delete UserScoketMap[userId]
        io.emit("getOnlineUsers",Object.keys(UserScoketMap))
    })
})


//Route setup
app.use("/api/status",(req,res)=>res.send("Server is live"))
app.use("/api/auth",userRouter)
app.use("/api/messages",messageRouter)





await connectDb();
const PORT=process.env.PORT || 5000

server.listen(PORT,()=>console.log("Server is running on the port number :"+PORT))