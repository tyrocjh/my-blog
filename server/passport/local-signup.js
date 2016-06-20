var Admin = require('../models/admin');
var passportLocalStrategy = require('passport-local').Strategy;

module.exports = function(config) {

  /**
   * Return the Passport Local Strategy object.
   */
  return new passportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  }, function(req, email, password, done) {
    var adminData = {
      email: email.trim(),
      password: password.trim(),
      name: req.body.name.trim()
    };

    var newAdmin = new Admin(adminData);
    newAdmin.save(function(err) {
      if (err) { return done(err); }

      return done(null);
    });
  });

};
