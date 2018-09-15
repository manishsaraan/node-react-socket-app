const express = require("express");
const http = require("http");
const path = require('path');
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, '/../client/build/')));

io.on("connection", socket => {
  // recieve socket events
  
  socket.on('add-user',({username}) => {
      socket.username = username;
      socket.broadcast.emit('join-user', { username: username})
  });

  socket.on('logout', ({ username }) => {
      socket.broadcast.emit('remove-user', { username });
  });

  // when user refreshes the page or internet got disconnected
  socket.on("disconnect", () => { 
    socket.broadcast.emit('remove-user', { username: socket.username }); });
});

server.listen(port, () => console.log(`Listening on port ${port}`));