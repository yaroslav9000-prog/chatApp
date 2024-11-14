import {createServer} from "http";
import {Server} from "socket.io";

const httpServer = createServer()
// (req, res)=>{
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Websocket server is running');
// }
const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false: ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
});

io.on("connection", socket=>{
    console.log(`User ${socket.id} connected`);

    socket.on("message", message=>{
        console.log(message);
        io.emit("message", `${socket.id.substring(0,5)}: ${message}`);
    })
})



httpServer.listen(8080, ()=>{
    console.log("Server is up and running on port 8080");
})