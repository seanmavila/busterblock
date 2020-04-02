const http = require("http");
const fs = require("fs");
const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require("mysql");
const port = 3306;
const app = express();

//SQL stuff
var connection = mysql.createConnection({
  host: "localhost",
  user: "cowcow",
  password: "CowsGoMoo",
  database: "Busterblock"
});

connection.connect(function(error) {
  if (!!error) {
    console.log("mysql connect Error");
  } else {
    console.log("Connected to mysql");
  }
});

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
  userSession.authenticated = true;//creat a authenticate function to check database
  if(userSession.authenticated)
    resp.redirect("/home");
  else
    resp.redirect('/');
  //probably can change this response to be better

});

app.post("/logout", function(req,resp){
  userSession  = req.session;
  userSession.destroy(function(err){
    resp.redirect('/');
  });
});

var server = http.createServer(app);
server.listen("3000", () => {
  console.log("Server started on port 3000");
});
