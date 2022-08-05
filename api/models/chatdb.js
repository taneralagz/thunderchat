const mongooose = require('mongoose');
const Schema = mongooose.Schema;
const chatSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: { type: Date, default: Date.now },
});
const Chat = mongooose.model('Chat', chatSchema);
module.exports = Chat;