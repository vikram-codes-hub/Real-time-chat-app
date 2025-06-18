import express from 'express';
import "dotenv/config";
import http from 'http';
import cors from "cors";
import { connectDb } from './lib/db.js';
import userRouter from './Routes/UserRoute.js';
import messageRouter from './Routes/Messageroute.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Socket.io setup
export const io = new Server(server, {
  cors: { origin: "*" }
});

// Store mapping of userId => socketId
export const UserSocketMap = {}; // ✅ Fixed name

// Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (!userId) {
    console.log("No userId provided in handshake");
    return;
  }

  console.log("User connected:", userId);

  // Save user to the socket map
  UserSocketMap[userId] = socket.id;

  // Emit all online user IDs to all clients
  io.emit("getOnlineUsers", Object.keys(UserSocketMap));

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);
    delete UserSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(UserSocketMap));
  });

  // Optional: Message relay support
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const receiverSocketId = UserSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        senderId,
        message,
      });
    }
  });
});

// Routes
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// DB connection and server start
await connectDb();
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
