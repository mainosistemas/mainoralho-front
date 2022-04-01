const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 5000;
app.use(cors())
app.get('/', (req, res)=>{
  res.send('Ola')
});

io.on('connection', (socket)=>{
  console.log(socket)
  socket.on('room', (room)=>{
    room.emit('connect', room)
  })
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
