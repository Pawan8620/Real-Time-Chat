// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// // Listen for connections
// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // 1. Broadcast to everyone except the sender
//   socket.on("broadcast-message", (data) => {
//     socket.broadcast.emit("receive-message", data);
//   });

//   // 2. Send to all users including the sender
//   socket.on("send-to-all", (data) => {
//     io.emit("receive-message", data);
//   });

//   // 3. Join a room
//   socket.on("join-room", (room) => {
//     socket.join(room);
//     socket.emit("room-joined", `You joined room: ${room}`);
//   });

//   // Send messages to specific rooms
//   socket.on("room-message", ({ room, message }) => {
//     io.to(room).emit("receive-message", { message, room });
//   });

//   // Handle disconnect
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

// server.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });





import express from "express"
import { Server } from "socket.io";
import {createServer} from "http";
// import {cors} from "cors"

const app = express();
// const server = new Server(app);
const server = createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }
});

// io.on("connection",(socket)=>{
//     console.log("Server is connected");
//     console.log("Socket Id is:",socket.id);
//     //jo socket hai usko hi mssg jayega
//     //the current socket(the socket which is emitting) will only get mssg
//     socket.emit("welcome",`Welcome to the connected server: ${socket.id}`); 
//     //Except the current all other socket will receive mssg
//     socket.broadcast.emit("welcome",`Just Joined the server: ${socket.id}`); 
// })

const port = 3000
// app.use(cors({
//     origin:"http://localhost:5173",
//     methods:["GET","POST"],
//     credentials:true,
// }))
app.get("/",(req,res)=>{
    res.send("Hello World")
})

// io.on("connection", (socket) => {
//     console.log("User Connected", socket.id);
    
//     socket.on("message",(message)=>{
//       console.log(message);
//       socket.broadcast.emit("one-message", message)
//     })

//     socket.on("one-message", (data) => {
//       socket.broadcast.emit("receive-message", data);
//     });
    
  
//     // socket.on("message", ({ room, message }) => {
//     //   console.log({ room, message });
//     //   socket.to(room).emit("receive-message", message);
//     // });
  
//     // socket.on("join-room", (room) => {
//     //   socket.join(room);
//     //   console.log(`User joined room ${room}`);
//     // });
  
//     socket.on("disconnect", () => {
//       console.log("User Disconnected", socket.id);
//     });
//   });


// Listen for connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // 1. Broadcast to everyone except the sender
  socket.on("broadcast-message", (data) => {
    socket.broadcast.emit("receive-message", data);
  });

  // 2. Send to all users including the sender
  socket.on("send-to-all", (data) => {
    io.emit("receive-message", data);
  });

  // 3. Join a room
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);
  
    // Notify the user who joined
    socket.emit("room-joined", `You joined room: ${room}`);
  
    // Notify all others in the room about the new user
    socket.to(room).emit("receive-message", {
      message: `A new user has joined room: ${room}`,
      room,
    });
  });
  

  // Send messages to specific rooms
  socket.on("room-message", ({ room, message }) => {
    io.to(room).emit("receive-message", { message, room });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(port,()=>{
    console.log(`Backend is successfully running on http://localhost:${port}`);
})
