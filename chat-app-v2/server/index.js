import { Server } from 'socket.io';
import express from 'express';
import path from 'path';

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

  socket.on('message', (data) => {
    console.log(data);

    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
  });
});
