// var bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');
var Admin = require('../models/admin');
var passportLocalStrategy = require('passport-local').Strategy;

module.exports = function(config) {

  return new passportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  }, function(req, email, password, done) {
    var adminData = {
      email: email.trim(),
      password: password.trim(),
    };

    // find a admin by email address
    Admin.findOne({email: adminData.email}, function(err, admin) {
      if (err) { return done(err); }

      if (!admin) {
        var error = new Error("Incorrect email or password");
        error.name = "IncorrectCredentialsError";
        return done(error);
      }

      var result = admin.comparePassword(adminData.password);

      if(result) {
        var token = 'test token...';
        var data = {
          name: admin.name
        };
        return done(null, token, data);
      } else {
        var error = new Error("Incorrect email or password");
        error.name = "IncorrectCredentialsError";
        return done(error);
      }

      // check if a hashed admin's password is equal to a value saved in the database
      // Admin.comparePassword(adminData.password, function(err, isMatch) {
      //   if (err) { return done(err); }

      //   if (!isMatch) {
      //     var error = new Error("Incorrect email or password");
      //     error.name = "IncorrectCredentialsError";
      //     return done(error);
      //   }

      //   var payload = {
      //     sub: admin._id,
      //   };
      //   // create a token string
      //   var token = jwt.sign(payload, config.jwtSecret);

      //   var adminData = {
      //     name: admin.name
      //   };

      //   return done(null, token, adminData);
      // });
    });
  });

};
