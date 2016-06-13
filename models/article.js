var mongoose = require('mongoose'),
		ObjectId = mongoose.Schema.ObjectId;

var Article = new mongoose.Schema({
	title: String,
	author: String,
	visits: {
		type: Number,
		default: 0
	},
	_type: {
		type: ObjectId,
		ref: 'ArticleType'
	},
	tags: [{
		type: ObjectId,
		ref: 'ArticleTag'
	}],
	published: Boolean,
	introduction: String,
	content: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Article', Article);
