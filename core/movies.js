const pool = require("./pool");

function Movies() {}

Movies.prototype = {

  getAll: function(callback)
  {
    //if the database gets fat then limit this to set number of tubles
    let sql = `SELECT * FROM movies`;

    pool.query(sql, function(err, result) {
      if (err) throw err;
      if (result.length) {
        callback(result);
      } else {
        callback(null);
      }
    });
  }

};

module.exports = Movies;
