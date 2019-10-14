require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

const User = require("./models/user");
const Message = require("./models/message");




mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express()

//socket io try
var sockIO = require('socket.io')();
app.sockIO = sockIO;


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(session({
  secret: "xy1zz",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(flash());
passport.use(new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, next) => {
   
  User.findOne({ username }, (err, user) => {
    
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = "vivencia de cura";


// Routes middleware goes here
const index = require('./routes/index');
app.use('/', index);
const passportRouter = require("./routes/passportRouter");
app.use('/', passportRouter);


//socket io
let messages= [];

sockIO
.of("/chat1")
.on("connection", socket =>{
console.log(`Socket conectado: ${socket.id}`)

socket.emit("previousMessages", messages);

socket.on(`sendMessage`, data => {
  console.log(data)
  const { author, message, room} = data;

  let newMessage = new Message({
    author,
    message,
    room,
    
  })
  newMessage.save()

    .then(retorno => console.log(`Mensagem ${retorno} salva`))
    .catch(err => console.log(err))
 
socket.broadcast.emit("receivedMessage", data);
});

});


sockIO
.of("/chat2")
.on("connection", socket =>{
console.log(`Socket conectado: ${socket.id}`)

socket.emit("previousMessages", messages);

socket.on(`sendMessage`, data => {
  console.log(data)
  const { author, message, room} = data;

  let newMessage = new Message({
    author,
    message,
    room,
    
  })
  newMessage.save()

    .then(retorno => console.log(`Mensagem ${retorno} salva`))
    .catch(err => console.log(err))
 
socket.broadcast.emit("receivedMessage", data);
});

});




sockIO
.of("/chat3")
.on("connection", socket =>{
console.log(`Socket conectado: ${socket.id}`)

socket.emit("previousMessages", messages);

socket.on(`sendMessage`, data => {
  console.log(data)
  const { author, message, room} = data;

  let newMessage = new Message({
    author,
    message,
    room,
    
  })
  newMessage.save()

    .then(retorno => console.log(`Mensagem ${retorno} salva`))
    .catch(err => console.log(err))
 
socket.broadcast.emit("receivedMessage", data);
});

});


sockIO
.of("/chat4")
.on("connection", socket =>{
console.log(`Socket conectado: ${socket.id}`)

socket.emit("previousMessages", messages);

socket.on(`sendMessage`, data => {
  console.log(data)
  const { author, message, room} = data;

  let newMessage = new Message({
    author,
    message,
    room,
    
  })
  newMessage.save()

    .then(retorno => console.log(`Mensagem ${retorno} salva`))
    .catch(err => console.log(err))
 
socket.broadcast.emit("receivedMessage", data);
});

});


sockIO
.of("/chat5")
.on("connection", socket =>{
console.log(`Socket conectado: ${socket.id}`)

socket.emit("previousMessages", messages);

socket.on(`sendMessage`, data => {
  console.log(data)
  const { author, message, room} = data;

  let newMessage = new Message({
    author,
    message,
    room,
    
  })
  newMessage.save()

    .then(retorno => console.log(`Mensagem ${retorno} salva`))
    .catch(err => console.log(err))
 
socket.broadcast.emit("receivedMessage", data);
});

});


sockIO
.of("/chat6")
.on("connection", socket =>{
console.log(`Socket conectado: ${socket.id}`)

socket.emit("previousMessages", messages);

socket.on(`sendMessage`, data => {
  console.log(data)
  const { author, message, room} = data;

  let newMessage = new Message({
    author,
    message,
    room,
    
  })
  newMessage.save()

    .then(retorno => console.log(`Mensagem ${retorno} salva`))
    .catch(err => console.log(err))
 
socket.broadcast.emit("receivedMessage", data);
});

});


sockIO
.of("/chat7")
.on("connection", socket =>{
console.log(`Socket conectado: ${socket.id}`)

socket.emit("previousMessages", messages);

socket.on(`sendMessage`, data => {
  console.log(data)
  const { author, message, room} = data;

  let newMessage = new Message({
    author,
    message,
    room,
    
  })
  newMessage.save()

    .then(retorno => console.log(`Mensagem ${retorno} salva`))
    .catch(err => console.log(err))
 
socket.broadcast.emit("receivedMessage", data);
});

});


sockIO
.of("/chat8")
.on("connection", socket =>{
console.log(`Socket conectado: ${socket.id}`)

socket.emit("previousMessages", messages);

socket.on(`sendMessage`, data => {
  console.log(data)
  const { author, message, room} = data;

  let newMessage = new Message({
    author,
    message,
    room,
    
  })
  newMessage.save()

    .then(retorno => console.log(`Mensagem ${retorno} salva`))
    .catch(err => console.log(err))
 
socket.broadcast.emit("receivedMessage", data);
});

});









module.exports = app;
