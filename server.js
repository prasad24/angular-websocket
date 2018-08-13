const express = require('express');

const app = express();

//Socket IO setup
const http = require('http').Server(app);
const io = require('socket.io')(http);


const PORT = process.env.PORT || 3000;

io.on('connection', socket => {
    console.log('New connection has been made');

    socket.on('join', data => {
        console.log(data.username + ' joined room ' + data.lobby);

        //Make the user join the lobby
        socket.join(data.lobby);

        //Broadcast to other users, that some else joined the room
        socket.broadcast.to(data.lobby).emit('newuser',{
            username: data.username,
            message: 'User ' + data.username + ' has joined'
        });
    });
})

http.listen(PORT, ()=>{
    console.log('Listening on port:' + PORT);
})

