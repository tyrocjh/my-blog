var express = require('express');
var router = express.Router();
var BlogInfo = require('../../../models/blogInfo');

/*
	{
	  "title": "my title",
	  "description": "my description",
	  "keywords": "my keywords",
	  "copyright": "my copyright"
	}
*/

router.get('/', function (req, res) {
	BlogInfo.findOne(function(err, model) {
		if(err) {
			console.info(err);
			res.json({
				status: 'fail'
			});
		} else {
			res.json({
				status: 'success',
				data: model
			});
		}
	});
});

router.post('/', function (req, res) {
	params = req.body;
	BlogInfo.create(params, function(err, model) {
		if(err) {
			console.info(err);
			res.json({
				status: 'fail',
				msg: '创建失败！'
			});
		} else {
			res.json({
				status: 'success',
				msg: '创建成功！'
			});
		}
	});
});

router.put('/', function(req, res) {
	params = req.body;

	console.info('put...');
	res.send('aa');
});

module.exports = router;
