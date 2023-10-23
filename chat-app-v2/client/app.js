const socket = io('ws://localhost:3500');

const sendMessage = (event) => {
  event.preventDefault();
  const input = document.querySelector('input');

  if (input.value) {
    socket.emit('message', input.value);
    input.value = '';
  }
  input.focus();
};

document.querySelector('form').addEventListener('submit', sendMessage);

// Listen for messages

socket.on('message', (data) => {
  const listItem = document.createElement('li');
  listItem.textContent = data;
  document.querySelector('ul').appendChild(listItem);
});
