/**
 * Created by parikhv on 9/26/16.
 */

var facebook = require('./facebook');
var authConfig = require('./auth');

var User = require('../models/users');

module.exports = function(passport) {
    // Serialize user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        })
    });
    facebook(passport);
};