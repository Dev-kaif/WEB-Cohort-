import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({port:8000});

wss.on("connection",function(socket){
    console.log("user connected");
    // socket.send("hello");
    socket.on("message",(e)=>{
       if(e.toString()=== "ping" ){
        socket.send("pong")
       }else{
        socket.send("not pong")
       }
    })
})
