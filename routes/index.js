var express = require('express');
var router = express.Router();

var isLoggedIn = function(req, res, next) {
  // If user is authenticated for the given session
  // Next() makes call to the next middleware in-line
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
};

var routes = function(passport) {
  // Get Home page
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  // route for facebook authentication and login
  router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  router.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
      }));

  // Get Home page
  router.get('/profile', function(req, res, next) {
    res.render('profile', {user: req.user});
  });

  // handle logout
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};

module.exports = routes;
