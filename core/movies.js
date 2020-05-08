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
  },

  getList: function(list,callback)
  {

    let sql = `SELECT * FROM movies WHERE `;

    list.forEach(function(movieID, index){
      if(index+1 < list.length)
        sql += `mid = ${movieID} OR `;
      else
        sql += `mid = ${movieID}`;
    });

    pool.query(sql, function(err, result) {
      if (err) throw err;
      if (result.length) {
        callback(result);
      } else {
        callback(null);
      }
    });
  },

  rentMovies: function(userID,list,callback)
  {
    let sql = `INSERT INTO rentals (uid, mid, rented) VALUES `;
    let rentDate = new Date();
    rentDate.setDate(rentDate.getDate() + 3);

    list.forEach(function(movieID, index){
      if(index+1 < list.length)
        sql += `(${userID},${movieID},"${rentDate.getFullYear()}-${rentDate.getMonth()}-${rentDate.getDate()}"), `;
      else
        sql += `(${userID},${movieID},"${rentDate.getFullYear()}-${rentDate.getMonth()}-${rentDate.getDate()}");`;
    });

    pool.query(sql, function(err, result) {
      if (err) throw err;
      callback();
    });
  }

};

module.exports = Movies;
