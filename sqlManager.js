const mysql = require("mysql");
var connection;

exports.init = function()
{
  connection = mysql.createConnection({
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
}

exports.checkUserPass = function(username, password, callback)
{
  //run sql qurry
  connection.query(`SELECT uid FROM users WHERE name = "${username}" AND pass = "${password}"`, function(err, data){
    if(data.length > 0)
    {
      callback(true);
    }
    else
    {
      callback(false);
    }
  });
}

exports.makeUser = function(username, password, userPriv, callback)
{
  connection.query(`INSERT INTO users(name, priv, pass) VALUES ("${username}", ${userPriv}, "${password}")`, function(err, data){
    if(err)
      callback(false);
    else
      callback(true);
  });
}

exports.getAllMovies = function(callback)
{
  connection.query(`SELECT * FROM movies`, function(err, data){
    if(err)
      callback(false);
    else
      callback(data);
  });
}
