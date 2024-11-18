import express from "express";
import ws, {WebSocketServer} from "ws";

const PORT = process.env.PORT || 3500;

const app = express(); 

const wss = new WebSocketServer();

wss.on('connection', socket=>{
    socket.on('error', console.error);

    socket.on('message', (data)=>{
        console.log(data);
        socket.send(`I got a message from you was it: ${data}`);
    })
})

app.listen(PORT, ()=>{
    console.log('server is up and running on port ', PORT);
})