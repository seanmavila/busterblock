const express = require("express");
const User = require("../core/user");
const Movies = require("../core/movies");
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();

const movies = new Movies();

// Get the index page
router.get("/", (req, res, next) => {
  let user = req.session.user;
  // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
  if (user) {
    res.redirect("/home");
    return;
  }
  // IF not we just send the index page.
  res.render("index", { title: "Busterblock" });
});

// Get home page
router.get("/home", (req, res, next) => {
  let user = req.session.user;

  if (user) {
    res.render("home", { opp: req.session.opp, name: user.fullname });
    return;
  }
  res.redirect("/");
});

// Get userHome page
router.get("/adminHome", (req, res, next) => {
  let user = req.session.user;

  if (user) {
    res.render("adminHome", { opp: req.session.opp, name: user.fullname });
    return;
  }
  res.redirect("/");
});

//Get Movies page
router.get("/Movies", (req, res, next) => {
  let user = req.session.user;

  if (user) {
    movies.getAll(function (allmovies) {
      res.render("movies", {
        opp: req.session.opp,
        name: user.fullname,
        movies: allmovies,
      });
    });
  } else res.redirect("/");
});

router.get("/Checkout", (req, res, next) => {
  let user = req.session.user;

  if (user) {
    movies.getList(req.session.shoppingCart.split(","), function (
      selectedMovies
    ) {
      res.render("checkout", { moviesChosen: selectedMovies });
    });
  } else res.redirect("/");
});

router.post("/addToCart", (req, res, next) => {
  let user = req.session.user;

  if (user) {
    req.session.shoppingCart = req.body.moviesChosen;
    res.end();
  }
});

router.post("/purchase", (req, res, next) => {
  let user = req.session.user;

  if (user) {
    movies.rentMovies(
      user.id,
      req.session.shoppingCart.split(","),
      function () {
        req.session.shoppingCart = "";
        res.end();
      }
    );
  }
});

router.get("/movieSearchResults", (req, res, next) => {
  let movies = req.session.movies;

  if (movies) {
    res.render("movieSearchResults", {
      opp: req.session.opp,
      mid: movies.mid,
      title: movies.title,
      genere: movies.genere,
    });
    return;
  }
  res.redirect("/");
});

router.post("/moviesearch", (req, res, next) => {
  movies.search(req.body.title, function (result) {
    if (result) {
      // Store the movie data in a session.
      req.session.movies = result;
      req.session.opp = 1;
      // redirect the user to the movieSearchResults page
      res.redirect("/movieSearchResults");
    } else {
      // if the search function returns null send this error message back to the user.
      res.send("Movie not found!");
    }
  });
});

// Post login data
router.post("/login", (req, res, next) => {
  // The data sent from the user are stored in the req.body object.
  // call our login function and it will return the result(the user data).
  user.login(req.body.username, req.body.password, function (result) {
    if (result) {
      // Store the user data in a session.
      req.session.user = result;
      req.session.opp = 1;
      if (req.session.user.userRank == "admin") {
        res.redirect("/adminHome");
      } else {
        res.redirect("/home");
      }
      // redirect the user to the home page.
    } else {
      // if the login function returns null send this error message back to the user.
      res.send("Username/Password incorrect!");
    }
  });
});

// Post register data
router.post("/register", (req, res, next) => {
  // prepare an object containing all user inputs.
  let userInput = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: req.body.password,
  };
  // call create function. to create a new user. if there is no error this function will return it's id.
  user.create(userInput, function (lastId) {
    // if the creation of the user goes well we should get an integer (id of the inserted user)
    if (lastId) {
      // Get the user data by it's id. and store it in a session.
      user.find(lastId, function (result) {
        req.session.user = result;
        req.session.opp = 0;
        res.redirect("/home");
      });
    } else {
      console.log("Error creating a new user ...");
    }
  });
});
router.post("/delUser", (req, res, next) => {
  // prepare an object containing all user inputs.
  let userInput = {
    id: req.body.id,
  };
  // call create function. to create a new user. if there is no error this function will return it's id.
  user.delete(userInput, function (lastId) {
    res.redirect("/adminHome");
  });
});

router.post("/updateUser", (req, res, next) => {
  // prepare an object containing all user inputs.
  let userInput = {
    username: req.body.username,
    fullname: req.body.fullname,
    userRank: req.body.userRank,
    id: req.body.id,
  };
  // call create function. to create a new user. if there is no error this function will return it's id.
  user.update(userInput, function (lastId) {
    res.redirect("/adminHome");
  });
});

// Post register data
router.post("/createMovie", (req, res, next) => {
  // prepare an object containing all user inputs.
  let userInput = {
    mid: req.body.mid,
    title: req.body.title,
    genere: req.body.genere,
  };
  // call create function. to create a new user. if there is no error this function will return it's id.
  movies.create(userInput, function (lastId) {
    res.redirect("/adminHome");
  });
});

router.post("/delMovie", (req, res, next) => {
  // prepare an object containing all user inputs.
  let userInput = {
    mid: req.body.mid,
  };
  // call create function. to create a new user. if there is no error this function will return it's id.
  movies.delete(userInput, function (lastId) {
    res.redirect("/adminHome");
  });
});

// Get loggout page
router.get("/logout", (req, res, next) => {
  // Check if the session is exist
  if (req.session.user) {
    // destroy the session and redirect the user to the index page.
    req.session.destroy(function () {
      res.redirect("/");
    });
  }
});

module.exports = router;
