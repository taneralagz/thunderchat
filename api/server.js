const express = require('express')
const socket = require('socket.io')
const app = express()
const port = 3000

app.get('/about', (req, res) => {
    res.send('Hakkımda sayfası..')
})

const server = app.listen(port)  //3000'i dinle
app.use(express.static('client')); // client index çalıştır

const io = socket(server);

console.log("Server is running on port: " + port);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('chat', (data) => {
        console.log(data);
        io.sockets.emit('chat', data);
    });
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});