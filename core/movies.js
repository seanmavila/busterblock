const pool = require("./pool");

function Movies() {}

Movies.prototype = {
  getAll: function (callback) {
    //if the database gets fat then limit this to set number of tubles
    let sql = `SELECT * FROM movies`;

    pool.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length) {
        callback(result);
      } else {
        callback(null);
      }
    });
  },

  search: function (title, callback) {
    // find the user data by his username.
    this.find(title, function (user) {
      // if there is a user by this username.
      if (user) {
        // now we check his password.
        callback(user);
        return;
      }
      // if the username/password is wrong then return null.
      callback(null);
    });
  },

  find: function (movie = null, callback) {
    // if the user variable is defind
    if (movie) {
      // if user = number return field = id, if user = string return field = username.
      var field = Number.isInteger(movie) ? "mid" : "title";
    }
    // prepare the sql query
    let sql = `SELECT * FROM movies WHERE ${field} = ?`;

    pool.query(sql, movie, function (err, result) {
      if (err) throw err;

      if (result.length) {
        callback(result[0]);
      } else {
        callback(null);
      }
    });
  },
  // This function will insert data into the database. (create a new user)
  // body is an object
  create: function (body, callback) {
    // this array will contain the values of the fields.
    var bind = [];
    // loop in the attributes of the object and push the values into the bind array.
    for (prop in body) {
      bind.push(body[prop]);
    }
    // prepare the sql query
    let sql = `INSERT INTO movies(mid, title, genere) VALUES (?, ?, ?)`;
    // call the query give it the sql string and the values (bind array)
    pool.query(sql, bind, function (err, result) {
      if (err) throw err;
      // return the last inserted id. if there is no error
      callback(result.insertId);
    });
  },
  delete: function (body, callback) {
    // this array will contain the values of the fields.
    var bind = [];
    // loop in the attributes of the object and push the values into the bind array.
    for (prop in body) {
      bind.push(body[prop]);
    }
    // prepare the sql query
    let sql = `DELETE FROM movies WHERE mid = ?`;
    // call the query give it the sql string and the values (bind array)
    pool.query(sql, bind, function (err, result) {
      if (err) throw err;
      // return the last inserted id. if there is no error
      callback(result.insertId);
    });
  },
};

module.exports = Movies;
