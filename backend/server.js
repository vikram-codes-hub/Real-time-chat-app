import express from 'express'
import "dotenv/config"
import http from 'http'
const app=express()
import cors from "cors"
import { connectDb } from './lib/db.js'
import userRouter from './Routes/UserRoute.js'

const server=http.createServer(app)

//middelware setup
app.use(express.json({limit:"4mb"}))//upload images limit 4mb
app.use(cors()) 



//Route setup
app.use("/api/status",(req,res)=>res.send("Server is live"))
app.use("/api/auth",userRouter)





await connectDb();
const PORT=process.env.PORT || 5000

server.listen(PORT,()=>console.log("Server is running on the port number :"+PORT))