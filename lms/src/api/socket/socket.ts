const { Server } = require("socket.io");
// const io = new Server(server);
// import { io, Socket } from "socket.io-client";

export default class RealTimeCommunicator{
    io:any;
    static instance:RealTimeCommunicator;
    constructor(server?:any){
        if(RealTimeCommunicator.instance) return RealTimeCommunicator.instance
        if(!server) throw new Error('please provide a server');
        this.io = new Server(server, {
            cors: {
              origin: "*",
              methods: ["GET", "POST"]
            }
          });      
        RealTimeCommunicator.instance = this;
    }

    onUserConnection(){
        let userSocket:any;
        this.io.on('connection', (socket:any) => {
            userSocket = socket;
            this.setListenners(socket);
            socket.on('disconnect', () => {
                console.log('user disconnected');
              });
          });
        return userSocket;  
    }

    broadcastOnUserVote( event:string, message?:any){
        this.io.emit(event, message);
    }
    setListenners(socket:any){
        // socket.on('chat message', (msg:any) => {
        //     console.log('chat message event')
        //     this.io.emit('chat message', msg);
        //   });
    }

    customEvent(event:string, message?:any){
        this.io.emit(event, message);
    }
    onElectionStart(event:string, message?:any){
        this.io.emit(event, message);
    }

    onElectionFinish(event:string, message?:any){
        this.io.emit(event, message);
    }
}