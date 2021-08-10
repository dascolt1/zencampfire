const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');

// io.configure(function () {
//   io.set('transports', ['xhr-polling']);
//   io.set('polling duration', 10);
// });

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/campfire', (req, res) => {
  res.render('campfire.html');
});

server.listen(PORT, () => {
  console.log(`Server is live on ${PORT}`);
});

io.on('connection', (socket) => {
  console.log(`user connected on ${socket.id}`);

  socket.on('send-message', (message) => {
    //if (room === '') {
    socket.broadcast.emit('message', message);
    // } else {
    //   socket.to(room).emit('message', message);
    // }
  });

  socket.on('join-room', (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`);
  });
});
