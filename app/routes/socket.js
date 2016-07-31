'use strict'
var chat = require('../data').chat;

// export function for listening to the socket
module.exports = function (socket) {
  socket.userName = 'guest';

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    var message = {user: socket.userName, text: data.message}
    console.log('message in room ' + socket.room + JSON.stringify(message));
    socket.broadcast.to(socket.room).emit('send:message',message);
    chat.addMessage(socket.room, message);
  });

  socket.on('joinRoom', function (data){
    if (!socket.room || data.room != socket.room){
      if (socket.room){
        socket.leave(socket.room);
      }

      socket.join(data.room);
      socket.room = data.room;
      socket.userName = data.userName;
      chat.addUser(socket.room, socket.userName);

    }
  });

  // validate a user's name change, and broadcast it on success
  socket.on('change:name', function (data, fn) {
    var oldName = socket.userName;
    chat.deleteUser(oldName, socket.room);

    socket.name = data.name;

    socket.broadcast.to(socket.room).emit('change:name', {
      oldName: oldName,
      newName: socket.name
    });
    fn(true);
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.to(socket.room).emit('user:left', {
      name: socket.userName
    });
    chat.deleteUser(socket.userName);
  });
};
