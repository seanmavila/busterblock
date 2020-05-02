const util = require("util");
const mysql = require("mysql");

// Connection to database

const pool = mysql.createPool({
  connectionLimiit: 10,
  host: "localhost",
  user: "root", // your mysql username
  password: "SMA8320sma1994$", //your mysql password
  database: "busterblock"
});

pool.getConnection((err, connection) => {
  if (err) console.error("Something went wrong connecting to the database ...");

  if (connection) connection.release();
  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
