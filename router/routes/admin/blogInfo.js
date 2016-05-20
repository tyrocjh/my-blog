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
				status: 'fail',
				data: {}
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
	
	var query = {'title': '333', 'description': 'my description zz', 'keywords': 'my keywords cc', 'copyright': 'my copyright aaa sd', '_id': '573c41c8356a3db93b858386'};
	var update = {'title': 'zzzzz', 'description': '22222', 'keywords': '33333', 'copyright': '44444', '_id': '573c41c8356a3db93b858386'};
	var options = {new: true};

	// debugger;

	BlogInfo.findOneAndUpdate(req.body, update, options, function(err, model) {
		debugger;
	});

	// BlogInfo.findOneAndUpdate(query, update, options, function(err, model) {
	//   console.info('aaaa');
	//   debugger;
	// });

	// BlogInfo.findOneAndUpdate(params, function(err, model) {
		// debugger;
		// console.info(err);
		// console.info(model);
		// res.send('aaaaa');
	// 	if(err) {
	// 		console.info(err);
	// 		res.json({
	// 			status: 'fail',
	// 			data: {}
	// 		});
	// 	} else {
	// 		res.json({
	// 			status: 'success',
	// 			data: model
	// 		});
	// 	}
	// });
});

module.exports = router;
