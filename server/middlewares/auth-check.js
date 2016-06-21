var jwt = require('jsonwebtoken'),
    Admin = require('../models/admin');

module.exports = function(config) {
  /**
   * Return the middleware function.
   */
  return function(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    var token = req.headers.authorization;

    // decode the token using a secret key-phrase
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      // the 401 code is for unauthorized status
      if (err) { return res.status(401).end(); }

      var userId = decoded.sub;

      // check if a user is exists
      Admin.findById(userId, function(err, user) {
        if (err || !user) {
          return res.status(401).end();
        }

        return next();
      });
    });
  };

};
