const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
// ...

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  
    socket.on('chat message', (data) => {
      io.emit('chat message', { user: socket.username, message: data.message });
    });
  
    socket.on('set username', (username) => {
      socket.username = username;
      io.emit('user joined', username);
    });
  });
  
  // ...
  

server.listen(3000, () => {
  console.log('Server listening on *:3000');
});
