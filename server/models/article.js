var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var Article = new mongoose.Schema({
	title: String,
	author: String,
	visits: {
		type: Number,
		default: 0
	},
	_type: {
		type: Schema.Types.ObjectId,
		ref: 'ArticleType'
	},
	tags: [{
		type: Schema.Types.ObjectId,
		ref: 'ArticleTag'
	}],
	published: Boolean,
	introduction: String,
	content: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Article', Article);
