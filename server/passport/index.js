var passport = require('passport');

module.exports = function(config) {
  var localSignupStrategy = require('./local-signup')(config);
  var localLoginStrategy = require('./local-login')(config);

  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);
};
