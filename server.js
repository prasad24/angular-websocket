const express = require('express');

const app = express();

//Socket IO setup
const http = require('http').Server(app);
const io = require('socket.io')(http);


const PORT = process.env.PORT || 3000;

io.on('connection', socket => {
    console.log('New connection has been made');
})

http.listen(PORT, ()=>{
    console.log('Listening on port:' + PORT);
})

