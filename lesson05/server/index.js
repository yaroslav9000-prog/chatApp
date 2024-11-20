import express from "express";
import ws, {WebSocketServer, WebSocket} from "ws";
import path from "path";
import {v4 as uuidv4} from "uuid";
import { fileURLToPath } from "url";
import OpenAI from "openai/index.mjs";
// const openai = new OpenAI();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

const app = express(); 

app.get('/', (req, res)=>{
    res.send("hello motherfucker")
})
app.use(express.static(path.join(__dirname,'public')));


const wsServer = new WebSocketServer({port: 80});

// const usersState = {
//     users: [],
//     setUsers: function(newUsersArray){
//         this.users = newUsersArray
//     }
// }


wsServer.on('connection', socket=>{
    // const userID = uuidv4();
    // usersState.setUsers((userID)=>{
    //     return [...this.users, userID];
    // })
    console.log(`New connection is set.`);
    // socket.send(`You connected successfully your id is ${userID.substring(0,5)}`);
    socket.on('close', ()=>{
        console.log('Client has disconnected');
    })
    socket.on('message', (data)=>{
        console.log(data.toString());
        fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=${data.toString()}`)
        .then(response=> response.body)
        .then((rb) => {
            const reader = rb.getReader();
        
            return new ReadableStream({
              start(controller) {
                // The following function handles each data chunk
                function push() {
                  // "done" is a Boolean and value a "Uint8Array"
                  reader.read().then(({ done, value }) => {
                    // If there is no more data to read
                    if (done) {
                      console.log("done", done);
                      controller.close();
                      return;
                    }
                    // Get the data and send it to the browser via the controller
                    controller.enqueue(value);
                    // Check chunks by logging to the console
                    console.log(done, value);
                    push();
                  });
                }
        
                push();
              },
            });
          })
          .then((stream) =>
            // Respond with our stream
            new Response(stream, { headers: { "Content-Type": "text/html" } }).text(),
          )
          .then((result) => {
            // Do things with result
            socket.send(result.result);
          });
    })
    // socket.on('message', data=>{
    //     wsServer.clients.forEach(client=>{
    //         console.log('distributing message: ', data.toString());
    //         client.send(`${data}`);
    //     })    })

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