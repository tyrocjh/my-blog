var express = require('express');
		router = express.Router();

/*
	{
	  "email": "my email",
	  "password": "my password"
	}
*/

router.post('/', function (req, res) {
	var params = req.body;
	req.session.admin = {
		id: '123',
		name: 'asd'
	}
	debugger
	res.json({
		status: 'success'
	});
});

module.exports = router;
