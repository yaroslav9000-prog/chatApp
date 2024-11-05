const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Websocket server is running');
})

const wss = new WebSocket.Server({server});
//Event handler for websockets conections
wss.on('connection', (ws)=>{
    console.log('A new client has connected');

    //Event handler for incoming messages from clients
    ws.on('message', (message)=> {
        console.log(`Received a message: ${message}`);

        wss.clients.forEach((client)=>{
            if(client !== ws && client.readyState == WebSocket.OPEN){
                client.send(message);
            }
        })
    })
    ws.on('close', ()=>{
        console.log('A client disconected');
    })
})



const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log('Server is up and running on port 3000');
})