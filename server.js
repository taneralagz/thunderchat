const express = require('express')
const socket = require('socket.io')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

const server = app.listen(port)  //dinle
app.use(express.static('public')); // public klasörünü aç

const io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
});