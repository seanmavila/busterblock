const http = require("http");
const fs = require("fs");
const express = require("express");
const mysql = require("mysql");
const port = 3000;

const app = express();

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SMA8320sma1994$",
  database: "testdb"
});

connection.connect(function(error) {
  if (!!error) {
    console.log("mysql connect Error");
  } else {
    console.log("Connected to mysql");
  }
});

app.get("/", function(req, resp) {
  connection.query("select * from cities", function(error, rows, fields) {
    if (!!error) {
      console.log("Query Error");
    } else {
      console.log("Successful query");
    }
  });
});
app.listen("3000", () => {
  console.log("Server started on port 3000");
});
