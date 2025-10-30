const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public')); // serve HTML from 'public' folder

io.on('connection', (socket) => {
    console.log('A user connected');

    // listen for messages from clients
    socket.on('chat message', (msg) => {
        // broadcast message to all connected clients
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
