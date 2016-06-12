var mongoose = require('mongoose'),
		ObjectId = mongoose.Schema.Types.ObjectId;

var ArticleType = new mongoose.Schema({
	name: String,
	path: String,
	enabled: Boolean
}, {
	timestamps: true
});

module.exports = mongoose.model('ArticleType', ArticleType);
