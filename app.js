const http = require("http");
const fs = require("fs");
const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 3306;
const app = express();

//SQL stuff
var database = require('./sqlManager.js');
database.init();

//HTML stuff

//im going to structure this project the same way im used
app.use(express.static("./public"));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'smokeweedeverday',
  resave:true,
  saveUninitialized:true,
  cookie:{maxAge:60000}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var userSession;

app.get("/", function(req, resp) {
  userSession  = req.session;
  if(userSession.authenticated)
  {
    resp.render("home");
  }
  else
  {
    resp.render("login");
  }
});

app.get("/home", function(req,resp){
  userSession  = req.session;
  if(userSession.authenticated)
  {
    resp.render("home");
  }
  else
  {
    resp.render("login");
  }
});

app.post("/login", function(req,resp){
  userSession  = req.session;
  //might just use authenticated in session and not keep track off password
  userSession.username = req.body.username;
  userSession.password = req.body.password;
  database.checkUserPass(userSession.username, userSession.password, function(result){
    userSession.authenticated = result;
    if(userSession.authenticated)
      resp.redirect("/home");
    else
      resp.redirect('/');
      //probably can change this response to be better
  });
});

app.post("/logout", function(req,resp){
  userSession  = req.session;
  userSession.destroy(function(err){
    resp.redirect('/');
  });
});

app.post("/register", function(req,resp){
  userSession  = req.session;
  userSession.username = req.body.username;
  userSession.password = req.body.password;
  database.makeUser(userSession.username, userSession.password, 0, function(result){
    if(result)
    {
      database.checkUserPass(userSession.username, userSession.password, function(result){
        userSession.authenticated = result;
        if(userSession.authenticated)
          resp.redirect("/home");
        else
          resp.redirect('/');
      });
    }
    else
      resp.redirect('/');
  });
});

app.post("/getAllMovies", function(req, res){
  database.getAllMovies(function(response){
    console.log(response);
    res.json(response);
  });
});

var server = http.createServer(app);
server.listen("3000", () => {
  console.log("Server started on port 3000");
});
