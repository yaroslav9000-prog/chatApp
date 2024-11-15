import express from "express";
import {Server} from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = process.env.PORT || 3500;

const app = express();

const expressServer = app.listen(PORT, ()=>{
    console.log('listening on port ', PORT);
})

app.use(express.static(path.join(__dirname, 'public')));

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false: ["http://localhost:3500", "http://127.0.0.1:5500"]
    }
});


io.on("connection", socket=>{
    console.log(`User ${socket.id} connected`);

    //Upon signle user connecting
    socket.emit('message', 'Welcome to the chat');
    //Upon connection - to all users.
    socket.broadcast.emit('message', `User ${socket.id.substring(0,5)} connected`);

    socket.on("message", message=>{
        console.log(message);
        io.emit("message", `${socket.id.substring(0,5)}: ${message}`);
    })

    socket.on('disconnect', ()=>{
        socket.broadcast.emit('message', `User ${socket.id.substring(0,5)} disconnected`);
    })

    socket.on('typing', (name)=>{
        socket.broadcast.emit('typing', name)
    })
})

// expressServer