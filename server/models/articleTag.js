var mongoose = require('mongoose');

var ArticleTag = new mongoose.Schema({
	name: String,
	path: String
}, {
	timestamps: true
});

module.exports = mongoose.model('ArticleTag', ArticleTag);
