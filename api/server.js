const express = require('express')
const socket = require('socket.io')

const mongoose = require('mongoose')
const db_url = 'mongodb+srv://12345:12345@thunderchatdb.l3u96wb.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("\x1b[32m", "\x1b[32m", "\x1b[32m", "Veri tabanı bağlandı.", "\x1b[0m"))
    .catch((err) => console.log(err))


const app = express()
const port = 3000;

const Chat = require('./models/chatdb');

app.get('/about', (req, res) => {

    res.send('Hakkımda sayfası..')
})

const server = app.listen(port)  //3000'i dinle
app.use(express.static('client')); // client index çalıştır

const io = socket(server);

console.log("\x1b[32m", "\x1b[32m", "\x1b[32m", "Server is running on port: "+port, "\x1b[0m");


io.on('connection', (socket) => {
    socket.on('chat', (data) => {

        const chat_insert = new Chat({
            user: data.sender,
            message: data.message,
            timestamp: Date.now()
        })
        chat_insert.save()
            .then(() => console.log('Mesaj başarıyla eklendi'))
            .catch((err) => console.log(err))
        Chat.find({})
            .then((chats) => {
                chats = chats.reverse()
                chats.forEach((data) => {
                    io.sockets.emit('chat', data)
                    console.log("data",data)
                    // console.log(chats);
                })
            }).catch((err) => console.log(err))

    });
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});