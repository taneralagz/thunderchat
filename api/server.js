//Require Space
const express = require('express')
const socket = require('socket.io')
const indexController = require('./client/controllers/indexController')
const Chat = require('./models/chatdb');
const mongoose = require('mongoose')
const ejsLayout=require('express-ejs-layouts')

const app = express()

//List of Online User 
let allUsers = [];
app.use(ejsLayout);
//Set up Template Engine For EJS
app.set('view engine', 'ejs');
app.set('views', './client/views');

//Static Files 
app.use(express.static('client'));
const port = 3000;

//Send App
indexController(app);
const server = app.listen(port)  //3000'i dinle
const io = socket(server);

const db_url = 'mongodb+srv://12345:12345@thunderchatdb.l3u96wb.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        console.log("\x1b[32m", "\x1b[32m", "\x1b[32m", "Veri tabanı bağlandı.", "\x1b[0m")
    )

console.log("\x1b[32m", "\x1b[32m", "\x1b[32m", "Server is running on port: " + port, "\x1b[0m");

io.on('connection', (socket) => {
    //Online kullanıcı ekleme
    allUsers.push({
        id: socket.id,
        username: 'default',
        room_id: "0"
    })

    // Uygulama içerine kaç kullanıcının olduğu bilgisi gönderildi
    io.emit("all_user",{allUsers: allUsers,socket_id: socket.id});
    //Çıkış yapan kullanıcıyı takip etme
    socket.on('disconnect', () => {
        let removeIndex = allUsers.findIndex(item => item.id === socket.id);
        allUsers.splice(removeIndex, 1);
        io.emit('all_user', allUsers.length);
    });

    socket.on('chat', (data) => {
        if (data.sender != "") {
            const chat_insert = new Chat({
                user: data.sender,
                message: data.message,
                timestamp: Date.now()
            })

            chat_insert.save()
                .then(() => console.log('Mesaj başarıyla eklendi'))
                .catch((err) => console.log(err))
        }
        Chat.find({})
            .then((chats) => {
                chats = chats.sort((b, a) => a.timestamp - b.timestamp)
                chats.forEach((data) => {
                    io.sockets.emit('chat', data)
                    // console.log("serveer data",data)
                    //console.log("serveer chats",data.timestamp);
                    //console.log("serveer user",data.user);
                })
            }).catch((err) => console.log(err))

    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

    socket.on('disconnect', () => {
        console.log("\x1b[32m", "\x1b[32m", "\x1b[32m", "User disconnected.", "\x1b[0m");
    }
    );
});