var express = require('express'),
		router = express.Router(),
		User = require('../models/user'),
		Comment = require('../models/comment');

// router.get('/', function (req, res) {
// 	BlogInfo.findOne(function(err, model) {
// 		if(err) {
// 			console.info(err);
// 			res.json({
// 				status: 'fail',
// 				data: {}
// 			});
// 		} else {
// 			res.json({
// 				status: 'success',
// 				data: model
// 			});
// 		}
// 	});
// });

router.post('/', function (req, res) {
	var params = req.body;
	var user = {
		img: 'mhbseal.com/upload/img/user.jpg',
		name: params.name,
		email: params.email
	};
	var comment = {
		content: params.content,
		article: params.article
	};

	User.create(user, function(err, nUser) {
		comment.user = nUser._id;
		Comment.create(comment, function(err, nComment) {
			res.json({
				status: 'success'
			});
		})
	});
});

module.exports = router;
