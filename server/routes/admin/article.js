var express = require('express'),
		router = express.Router(),
		Article = require('../../models/article'),
		ArticleType = require('../../models/articleType'),
		ArticleTag = require('../../models/articleTag');

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

router.get('/', function(req, res) {
	var condition = req.query;
	var pageList = {
		currentPage: +condition.page || 1,
		pageSize: 5,
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
							pageList: pageList
						}
					});
				});
		});
});

router.post('/', function(req, res) {
	var params = req.body;

	Article.create(params, function(err, model) {
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

router.get('/:id', function(req, res) {
	var id = req.params['id'];

	ArticleType.find({ enabled: true }, function(err, types) {
		ArticleTag.find({}, function(err, tags) {
			if(id !== 'undefined') {
				Article.findOne({ _id: id }, function(err, model) {
					res.json({
						status: 'success',
						msg: '查询成功！',
						data: {
							model: model,
							types: types,
							tags: tags
						}
					});
				});
			} else {
				res.json({
					status: 'success',
					msg: '查询成功！',
					data: {
						model: {},
						types: types,
						tags: tags
					}
				});
			}
		});
	});
});

router.put('/:id', function(req, res) {
	var id = req.params['id'];
	var params = req.body;
	var query = { _id: id };
	var options = { new: true };

	Article.findOneAndUpdate(query, params, options, function(err, model) {
		if(err) {
			console.info(err);
			res.json({
				status: 'fail',
				msg: '更新失败！'
			});
		} else {
			res.json({
				status: 'success',
				msg: '更新成功！'
			});
		}
	});
});

router.delete('/:id', function(req, res) {
	var id = req.params['id'];

	Article.remove({ _id: id }, function(err, model) {
		if(err) {
			console.info(err);
			res.json({
				status: 'fail',
				msg: '删除失败！'
			});
		} else {
			res.json({
				status: 'success',
				msg: '删除成功！'
			});
		}
	});
});

module.exports = router;
