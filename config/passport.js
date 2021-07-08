const config = require('./db');
const User = require('../models/user');

var JwtStrategy = require('passport-jwt').Strategy,                     // Get 'Strategy' object
    ExtractJwt = require('passport-jwt').ExtractJwt;                    // Get 'ExtractJwt' object

module.exports = function(passport) {
    var opts = {}                                                       // Object for auth options
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();     // Auth type
    opts.secretOrKey = config.secret;                                   // Secret key for auth
    //opts.issuer = 'accounts.examplesoft.com';                         // Options for work with another site's
    //opts.audience = 'yoursite.net';                                   // -----
    
    passport.use(new JwtStrategy(                                       // Actually jwt function
        opts,                                                           // Set options object
        function(
            jwt_payload,                                                // The user object that is trying auth
            done) {                                                     // Function after processing the parent function 
        User.findOne({id: jwt_payload.sub}, function(err, user) {       // Search user by id
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or could create a new account
            }
        });
    }));
};