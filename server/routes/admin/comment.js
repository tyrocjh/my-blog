var express = require('express'),
		router = express.Router(),
		Comment = require('../../models/comment');

/*
	{
	  "name": "my name",
	  "email": "my email"
	}
*/

router.get('/', function (req, res, next) {
	req.model = Comment;
	next();
}, require('./list'));

router.delete('/:id', function(req, res) {
	var id = req.params['id'];

	Comment.remove({ _id: id }, function(err, model) {
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
