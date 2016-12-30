// config/passport.js

// load all the things we need
var JwtStrategy   = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../datasets/users.js');
var config = require('./database.js');

// expose this function to our app using module.exports
module.exports = function(passport) {

	var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne( { email: jwt_payload.email }, function(err, user) {
            if(err) {
                return done(err, false);
            }
            if(!user) {
                return done(null, false);
            }
            return done(null, user);
        });
    }));
};