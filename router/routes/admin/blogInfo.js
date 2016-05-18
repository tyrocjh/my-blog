var express = require('express');
var router = express.Router();
var BlogInfo = require('../../../models/blogInfo');

router.get('/', function (req, res) {
	BlogInfo.findOne(function(err, model) {
		if(err) {
			res.send(err);
		} else {
			res.send(model);
		}
	});
});

router.post('/', function (req, res) {
	params = req.body;
	BlogInfo.create(params, function(err, model) {
		if(err) {
			res.send(err);
		} else {
			res.send(model);
		}
	});
});

module.exports = router;
