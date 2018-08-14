const express = require('express');

const app = express();

//Socket IO setup
const http = require('http').Server(app);
const io = require('socket.io')(http);


const PORT = process.env.PORT || 3000;

io.on('connection', socket => {
    socket.on('join', data => {

        //Make the user join the lobby
        socket.join(data.lobby);

        //Broadcast to other users, that some else joined the room
        socket.broadcast.to(data.lobby).emit('newuser',{
            username: data.username,
            message: 'User ' + data.username + ' has joined'
        });
    });

    socket.on('leave', data => {
        //Make the user leave the lobby
        socket.leave(data.lobby);

        //Broadcast to other users, that some else joined the room
        socket.broadcast.to(data.lobby).emit('userleft',{
            username: data.username,
            message: 'User ' + data.username + ' left'
        });
    });

    socket.on('message', data => {
        //Broadcast the message to all users including the sender using io.in.
        io.in(data.lobby).emit('message',{
            username: data.username,
            message: data.message
        });
    });
})

http.listen(PORT, ()=>{
    console.log('Listening on port:' + PORT);
})

