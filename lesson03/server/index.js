import express from "express";
import {Server} from "socket.io";

const PORT = process.env.PORT || 3500;

const app = express();

const expressServer = app.listen(PORT, ()=>{
    console.log('listening on port ', PORT);
})

const io = new Server(app, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : [
            
        ]
    }
});


expressServer