var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	var Model = req.model;
	var condition = req.query;
	var pageList = {
		currentPage: +condition.page || 1,
		pageSize: 5,
		pageRange: 2
	};

	Model
		.find({})
		.skip((pageList.currentPage - 1) * pageList.pageSize)
		.limit(pageList.pageSize)
		.sort({updatedAt: 'desc'})
		.exec(function(err, models) {
			Model
				.count({})
				.exec(function(err, count) {
					pageList.rowCount = count;
					pageList.pageCount = Math.ceil(pageList.rowCount / pageList.pageSize);

					res.json({
						status: 'success',
						msg: '查询成功！',
						data: {
							dataList: models,
							pageList: pageList
						}
					});
				});
		});
});

module.exports = router;
