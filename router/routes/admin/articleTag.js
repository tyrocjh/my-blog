var express = require('express');
var router = express.Router();
var ArticleTag = require('../../../models/articleTag');

/*
	{
	  "name": "my name",
	  "path": "my path"
	}
*/

router.get('/', function (req, res) {
	ArticleTag.find({}, function(err, models) {
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
				data: models
			});
		}
	});
});

router.post('/', function(req, res) {
	var params = req.body;
	ArticleTag.create(params, function(err, model) {
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
	ArticleTag.findOne({_id: id}, function(err, model) {
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
				data: model
			});
		}
	});
});

router.put('/:id', function(req, res) {
	var id = req.params['id'];
	var params = req.body;	
	var query = {_id: id};
	var options = {new: true};

	ArticleTag.findOneAndUpdate(query, params, options, function(err, model) {
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

	ArticleTag.remove({_id: id}, function(err, model) {
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
