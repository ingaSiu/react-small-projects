import './App.css';

import { useEffect, useState } from 'react';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

const App = () => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };

  const sendMessage = () => {
    socket.emit('send_message', { message, room });
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="container">
      <input
        placeholder="Room number..."
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
};

export default App;

