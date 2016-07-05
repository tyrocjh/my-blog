var ArticleTag = require('../models/articleTag'),
		Link = require('../models/link');

module.exports = function() {

	return function(req, res, next) {
		ArticleTag.find({}, function(err, tags) {
			req.tags = tags;
			Link.find({}, function(err, links) {
				req.links = links;
				return next();
			});
		});
	};

};
