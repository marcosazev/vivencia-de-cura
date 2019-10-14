const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const messageSchema = new Schema({
  author: String,
  message: String,
  room: String,
  
}, {
  timestamps: true
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;