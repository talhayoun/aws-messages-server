const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const message = mongoose.model("message", messageSchema);

module.exports = message;