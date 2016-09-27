/**
 * Created by parikhv on 9/26/16.
 */
var FacebookStrategy = require('passport-facebook').Strategy;
var authConfig = require('./auth');

var User = require('../models/users');

module.exports = function (passport) {
    passport.use('facebook', new FacebookStrategy({
        clientID: authConfig.facebookAuth.clientID,
        clientSecret: authConfig.facebookAuth.clientSecret,
        callbackURL: authConfig.facebookAuth.callbackURL
    }, function(access_token, refresh_token, profile, done) {
        debugger;

        process.nextTick(function() {
            User.findOne({'facebook.id': profile.id}, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();

                    debugger;

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = access_token;
                    newUser.facebook.name = profile.displayName;

                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};