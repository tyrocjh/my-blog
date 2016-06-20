var express = require('express'),
		router = express.Router(),
		passport = require('passport');

/*
	{
	  "email": "my email",
	  "password": "my password"
	}
*/

router.post('/', function (req, res, next) {

  passport.authenticate('local-login', function(err, token, adminData) {
    if (err) {
      if (err.name === "IncorrectCredentialsError") {
        return res.status(400).json({ success: false, message: err.message });
      }

      return res.status(400).json({ success: false, message: "Could not process the form." });
    }

    return res.json({ success: true, message: "You have successfully logged in!", token: token, user: adminData });
  })(req, res, next);
  
});

module.exports = router;
