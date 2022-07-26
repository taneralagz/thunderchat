const express = require('express');
const socket = require('socketio');

const app = express();
const server = app.listen(3000);

app.use(express.static('public'));