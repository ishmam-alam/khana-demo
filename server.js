const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

const server = http.createServer(app);


const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const IMAGE_COUNT = 5; // Define the number of images to fetch

app.get('/images', (req, res) => {
  const imageUrls = [];
  for (let i = 0; i < IMAGE_COUNT; i++) {
    imageUrls.push(`https://picsum.photos/200/300?random=${i}`);
  }
  res.json(imageUrls);
});

io.on('connection', (socket) => {
  // console.log('A client connected');

  socket.on('play', () => {
    // console.log('Play event received');
    io.emit('play');
  });

  socket.on('pause', () => {
    // console.log('Pause event received');
    io.emit('pause');
  });

  socket.on('disconnect', () => {
    // console.log('A client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
