var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SMA8320sma1994$",
  database: "busterblock"
});

connection.connect();

connection.query("select * from users", function(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  console.error(result);
});
