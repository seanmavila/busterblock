var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", //your mysql password if any
  database: "busterblock"
});

connection.connect();

var user = {
  uid: 000,
  name: "ye is in the buiiiilldddiiiinn",
  priv: 69,
  pass: "yeet"
};

connection.query("insert into users set ?", user, function(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  console.error(result);
});
