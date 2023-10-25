import { Server } from 'socket.io';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

const ADMIN = 'Admin';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// state
const UsersState = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

const io = new Server(expressServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5500', 'http://127.0.0.1:5500'],
  },
});

io.on('connection', (socket) => {
  console.log(`User: ${socket.id} connected`);

  // Upon connection - only to usser
  // .emit goes directly to user

  socket.emit('message', buildMessage(ADMIN, 'Welcome to Chat app!'));

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

const buildMessage = (name, text) => {
  return {
    name,
    text,
    time: new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date()),
  };
};

// User functions

// adding user
const activateUser = (id, name, room) => {
  const user = { id, name, room };
  UsersState.setUsers([...UsersState.users.filter((user) => user.id != id), user]);
  return user;
};

// removing user
const userLeavesApp = (id) => {
  UsersState.setUsers(UsersState.users.filter((user) => user.id != id));
};

// find the user we are looking for

const getUser = (id) => {
  return UsersState.users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  return UsersState.users.filter((user) => user.room === room);
};

// this will return all active rooms with no duplicates
const getAllActiveRooms = () => {
  return Array.from(new Set(UsersState.users.map((user) => user.room)));
};
