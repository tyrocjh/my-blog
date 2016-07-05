var express = require('express'),
		router = express.Router(),
		SinglePage = require('../models/singlePage');

router.get('/', function(req, res) {
	var tags = req.tags,
			links = req.links;

	SinglePage.findOne({path: req.query.path}, function(err, model) {
		if(err) {
			console.info(err);
			res.json({
				status: 'fail',
				msg: '查询失败！'
			});
		} else {
			res.json({
				status: 'success',
				msg: '查询成功！',
				data: {
					model: model,
					tags: tags,
					links: links
				}
			});
		}
	});
});

module.exports = router;
