import express from "express";
import ws, {WebSocketServer, WebSocket} from "ws";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

const app = express(); 

app.get('/', (req, res)=>{
    res.send("hello motherfucker")
})
app.use(express.static(path.join(__dirname,'public')));


const wsServer = new WebSocketServer({port: 80});

wsServer.on('connection', socket=>{
    console.log(`New connection is set.`);
    socket.send('connection is on fire!!!!');
    socket.on('close', ()=>{
        console.log('Client has disconnected');
    })
    socket.on('message', data=>{
        wsServer.clients.forEach(client=>{
            console.log('distributing message: ', data.toString());
            client.send(`${data}`);
        })    })

        socket.on('error', (error)=>{
            console.log(`${error}`);
        })
    })
// httpServer.on('upgrade', (req, socket, head)=>{
//     wsServer.handleUpgrade(req, socket, head, (ws)=>{
//         ws.emit('connection', ws, request);
//         console.log(req, socket, head);
//     })
// })

app.listen(PORT, ()=>{
    console.log('server is up and running on port ', PORT);
})