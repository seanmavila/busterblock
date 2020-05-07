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
};

module.exports = Movies;
