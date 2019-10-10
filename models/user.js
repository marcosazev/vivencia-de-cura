const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  name: String,
  password: String,
  disease:String,
  role: {
    type: String,
    enum : ['GUEST', 'ADMIN'],
    default : 'GUEST'
  },
  
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;