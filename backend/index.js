const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const SockerIO = require('socket.io');
const io = SockerIO(server);

port = process.env.port || 5100;

server.listen(port , ()=>{
    console.log(`App connected at http://localhost:${port}`)
});

io.on('connection',(socket)=>{
    socket.on('join',(data)=>{
       socket.on(data.room);
       socket.broadcast.to(data.room).emit('new user joined')
    });

    socket.on('message',(data)=>{
        io.in(data.room).emit('new message',{user:data.user , message: data.message})
    })
})