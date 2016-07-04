var ArticleTag = require('../models/articleTag');

module.exports = function() {

	return function(req, res, next) {
		ArticleTag.find({}, function(err, tags) {
			if(err) {
				console.info(err);
			} else {
				req.tags = tags;
				return next();
			}
		});
	};

};
