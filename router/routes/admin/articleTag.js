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
	res.send('article tage list...');
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
	res.send('article get...');
});

router.put('/:id', function(req, res) {
	res.send('article put...');
});

router.delete('/:id', function(req, res) {
	res.send('article delete...');
});

module.exports = router;
