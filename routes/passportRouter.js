const express = require("express");
const passportRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const flash = require("connect-flash");
const Message = require("../models/message");

//check roles
function checkRoles(role) {
  return function(req, res, next) {
    if (req.user.role === "ADMIN") {
      return next();
    } else {
      alert("acesso negado")
    }
  }
};

const checkAdmin  = checkRoles('ADMIN');
 

//routes

passportRouter.get("/signup", (req, res) => {
  res.render("passport/signup");
});

passportRouter.post("/signup",  (req, res, next) => {
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const disease = req.body.disease;
  if (username === "" || password === "" || name ==="" || disease==="" ) {
    res.render("passport/signup", { message: "Algum campo ainda não preenchido" });
    return;
  }
  
  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("passport/signup", { message: "nome de usuario já preenchido, favor escolher outro." });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    
    const newUser = new User({
      username,
      name,
      password: hashPass,
      disease,
      role:"ADMIN"
    });

    newUser.save((err) => {
      if (err) {
        res.render("passport/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  })
  .catch(error => {
    next(error)
  })
});

passportRouter.get("/login",  (req, res, next) => {
res.render("passport/login",{"message": req.flash("error")});
});

passportRouter.post("/login", passport.authenticate("local", {
  successRedirect: "/selectRoom",
  failureRedirect: "/login",
  //failureFlash: true,
  passReqToCallback: true
}));

passportRouter.get("/private-chat/:roomFromRoute", ensureLogin.ensureLoggedIn(), (req, res) => {
  const { roomFromRoute } = req.params;

  Message.find({ room: roomFromRoute })
  .then(messages => {
 if(roomFromRoute=="chat1"){
  res.render("passport/chatRooms/chatRoom1", { user: req.user , messages, roomFromRoute})
 }

 if(roomFromRoute=="chat2"){
  res.render("passport/chatRooms/chatRoom2", { user: req.user , messages, roomFromRoute})
 }

 if(roomFromRoute=="chat3"){
  res.render("passport/chatRooms/chatRoom3", { user: req.user , messages, roomFromRoute})
 }

 if(roomFromRoute=="chat4"){
  res.render("passport/chatRooms/chatRoom4", { user: req.user , messages, roomFromRoute})
 }

 if(roomFromRoute=="chat5"){
  res.render("passport/chatRooms/chatRoom5", { user: req.user , messages, roomFromRoute})
 }

 if(roomFromRoute=="chat6"){
  res.render("passport/chatRooms/chatRoom6", { user: req.user , messages, roomFromRoute})
 }

 if(roomFromRoute=="chat7"){
  res.render("passport/chatRooms/chatRoom7", { user: req.user , messages, roomFromRoute})
 }

 if(roomFromRoute=="chat8"){
  res.render("passport/chatRooms/chatRoom8", { user: req.user , messages, roomFromRoute})
 }

})


  
});

passportRouter.get("/selectRoom", ensureLogin.ensureLoggedIn() , (req, res) => {
  
  res.render("passport/selectRoom", { user: req.user })
 
});


passportRouter.get("/admin", ensureLogin.ensureLoggedIn(), checkAdmin, (req, res) => {

  res.render("passport/chat", { user: req.user})
});
  
passportRouter.get("/private-chat", ensureLogin.ensureLoggedIn(), (req, res) => {
  Message.find({username})
  .then(retorno => {
   
  res.render("passport/private", { user: req.user , retorno})
})

  .catch(err => console.log(err))
  
});

passportRouter.post("/admin", (req, res) => {
  
  const username = req.body.username;
  console.log(username)
  User.find({username})
  .then(users => {
    console.log(users)
  res.render("passport/chat", { user: req.user , users})
})

  .catch(err => console.log(err))
  
});

passportRouter.post('/:id/deleteUser',(req, res) => {
  const { id }=req.params;
 let mod= id.split("").filter((item,idx) => idx !==0).join("")
  

 User.findByIdAndDelete(mod)
 .then((movie) => {
  res.render("passport/chat", { user: req.user })
   })
   .catch((movie) => {
     console.log("error")
   
   })
 });



passportRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = passportRouter;