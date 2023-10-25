import { Server } from 'socket.io';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5500', 'http://127.0.0.1:5500'],
  },
});

io.on('connection', (socket) => {
  console.log(`User: ${socket.id} connected`);

  // Upon connection - only to usser
  // .emit goes directly to user

  socket.emit('message', 'Welocome to chat app!');

  // Upon connection - to all others
  // .broadcast goes to everyone else except the user
  socket.broadcast.emit('message', `User: ${socket.id.substring(0, 5)} connected`);

  // Listening for a message event
  socket.on('message', (data) => {
    console.log(data);

    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
  });

  // when user disconnects - to all others
  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `User: ${socket.id.substring(0, 5)} disconnected`);
  });

  // Listen for activity
  // everyone else will get a message that we are typing

  socket.on('activity', (name) => {
    socket.broadcast.emit('activity', name);
  });
});