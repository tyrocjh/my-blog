var express = require('express'),
		router = express.Router(),
		Article = require('../models/article'),
		ArticleType = require('../models/articleType'),
		ArticleTag = require('../models/articleTag');

/*
	{
    "title": "my title",
    "author": "my author",
    "type": ObjectId,
    "tags": [ObjectId],
    "introduction": "my introduction",
    "content": "my content"
	}
*/

router.get('/', function(req, res, next) {
	var tags = req.tags;
	var condition = req.query;
	var pageList = {
		currentPage: +condition.page || 1,
		pageSize: 10,
		pageRange: 2
	};

	Article
		.find()
		.populate('_type', 'name path')
		.populate('tags', 'name path')
		.skip((pageList.currentPage - 1) * pageList.pageSize)
		.limit(pageList.pageSize)
		.sort({updatedAt: 'desc'})
		.exec(function(err, models) {
			Article
				.count({})
				.exec(function(err, count) {
					pageList.rowCount = count;
					pageList.pageCount = Math.ceil(pageList.rowCount / pageList.pageSize);

					res.json({
						status: 'success',
						msg: '查询成功！',
						data: {
							dataList: models,
							pageList: pageList,
							tags: tags
						}
					});
				});
		});
});

// router.get('/:id', function(req, res) {
// 	var id = req.params['id'];

// 	ArticleType.find({ enabled: true }, function(err, types) {
// 		ArticleTag.find({}, function(err, tags) {
// 			if(id !== 'undefined') {
// 				Article.findOne({ _id: id }, function(err, model) {
// 					res.json({
// 						status: 'success',
// 						msg: '查询成功！',
// 						data: {
// 							model: model,
// 							types: types,
// 							tags: tags
// 						}
// 					});
// 				});
// 			} else {
// 				res.json({
// 					status: 'success',
// 					msg: '查询成功！',
// 					data: {
// 						model: {},
// 						types: types,
// 						tags: tags
// 					}
// 				});
// 			}
// 		});
// 	});
// });

module.exports = router;
