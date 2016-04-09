var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var config = require('../config');

module.exports = function(passport) {

  passport.use( new FacebookStrategy({
    clientID        : config.fb_appid,
    clientSecret    : config.fb_appsecret,
    callbackURL     : config.fb_callbackUrl,
    profileFields   : ['id', 'displayName', 'emails'],
    enableProof     : true
  },

  // facebook will send back the tokens and profile
  function(accessToken, refreshToken, profile, done) {
    console.log('profile', profile);

    // asynchronous
    process.nextTick(function() {

      User.findOne({ 'fb.id' : profile.id }, function(err, user) {

        if (err){
          return done(err);
        }
        if (user) {
          console.log('=========================== user ', profile.displayName ,' found in database');
          return done(null, user); // user found, return that user
        } else {
          console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& new user ', profile.displayName ,' join us!!!!');
          var newUser = new User();

          newUser.fb.id           =   profile.id; // set the users facebook id
          newUser.fb.access_token =   accessToken; // we will save the token that facebook provides to the user
          newUser.fb.displayName  =   profile.displayName;
          if( profile.emails && profile.emails.length > 0)
            newUser.fb.email        =   profile.emails[0].value; // facebook can return multiple emails so we'll take the first
          newUser.time            =   new Date().toISOString();

          // save our user to the database
          newUser.save(function(err) {
            if (err)
              throw err;
            // if successful, return the new user
            return done(null, newUser);
          });
        }
      });
    });
  }));
};


