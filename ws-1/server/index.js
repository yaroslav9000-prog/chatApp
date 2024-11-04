import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 5500});

wss.on('connection', function connection(ws){
    ws.on('error', console.error);

    ws.on('message', function message(data){
        console.log('received message: %s', data)
    })

    ws.send(data);
})