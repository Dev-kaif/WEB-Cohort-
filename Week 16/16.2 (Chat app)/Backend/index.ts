import { WebSocketServer,WebSocket } from "ws";
const ws = new WebSocketServer({port:8080})

interface User{
    socket :WebSocket,
    room : string
}

let allSocket:User[] = []

ws.on('connection',(socket)=>{
    console.log("User Connected");
    
    socket.on('message',(message)=>{
        
        let parssedMessage = JSON.parse(message.toString())

        if(parssedMessage.type ==="join" && parssedMessage.payload.roomId){
            console.log("user joined : "+parssedMessage.payload.roomId);
            
            allSocket.push({
                socket,
                room:parssedMessage.payload.roomId
            })
        }

        if(parssedMessage.type == "chat" && parssedMessage.payload.message){
            const curruntUserRoom = allSocket.find((x)=>x.socket == socket)
            allSocket.forEach((user)=>{
                if(user.room == curruntUserRoom?.room){
                    user.socket.send(parssedMessage.payload.message)
                }
            })
        }
    })



    socket.on('disconnected',()=>{
        console.log("user Disconnected");
        
        allSocket = allSocket.filter((x)=> x.socket != socket)
    })
})

