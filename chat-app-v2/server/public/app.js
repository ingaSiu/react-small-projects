const socket = io('ws://localhost:3500');

const msgInput = document.querySelector('#message');
const nameInput = document.querySelector('#name');
const chatRoom = document.querySelector('#room');

const activity = document.querySelector('.activity');
const usersList = document.querySelector('.user-list');
const roomList = document.querySelector('.room-list');
const chatDisplay = document.querySelector('.chat-display');

const sendMessage = (event) => {
  event.preventDefault();

  if (nameInput.value && msgInput.value && chatRoom.value) {
    socket.emit('message', {
      name: nameInput,
      text: msgInput.value,
    });
    msgInput.value = '';
  }
  msgInput.focus();
};

const enterRoom = (e) => {
  e.preventDefault();
  if (nameInput.value && chatRoom.value) {
    socket.emit('enterRoom', {
      name: nameInput.value,
      room: chatRoom.value,
    });
  }
};

document.querySelector('.form-msg').addEventListener('submit', sendMessage);
document.querySelector('.form-join').addEventListener('submit', enterRoom);

msgInput.addEventListener('keypress', () => {
  socket.emit('activity', nameInput.value);
});

// Listen for messages
socket.on('message', (data) => {
  activity.textContent = '';
  const { name, text, time } = data;
  const listItem = document.createElement('li');
  listItem.classList = 'post';
  if (name === nameInput.value) listItem.className = 'post post--left';
  if (name !== nameInput.value && name !== 'Admin') listItem.className = 'post post--right';
  if (name !== 'Admin') {
    listItem.innerHTML = `<div class= "post__header ${
      name === nameInput.value ? 'post__header--user' : 'post__header--reply'
    }">
    <span class="post__header--name">${name}</span>
    <span class="post__header--time">${time}</span>
    </div>
    <div class="post__text">${text}</div>
    `;
  } else {
    listItem.innerHTML = `<div class='post__text'>${text}</div>`;
  }
  document.querySelector('.chat-display').appendChild(listItem);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
});

let activityTimer;
socket.on('activity', (name) => {
  activity.textContent = `${name} is typing...`;

  // Clear after 3 seconds
  clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    activity.textContent = '';
  }, 3000);
});

socket.on('userList', ({ users }) => {
  showUsers(users);
});
socket.on('roomList', ({ rooms }) => {
  showRooms(rooms);
});

const showUsers = (users) => {
  usersList.textContent = '';
  if (users) {
    usersList.innerHTML = `<em>Users in ${chatRoom.value}: </em>`;

    users.foreach((user, i) => {
      usersList.textContent += ` ${user.name}`;
      if (users.length > 1 && i !== users.length - 1) {
        usersList.textContent += ',';
      }
    });
  }
};
const showRooms = (rooms) => {
  roomList.textContent = '';
  if (rooms) {
    roomList.innerHTML = '<em>Active rooms:</em>';

    rooms.foreach((room, i) => {
      roomList.textContent += ` ${room}`;
      if (rooms.length > 1 && i !== rooms.length - 1) {
        roomList.textContent += ',';
      }
    });
  }
};
