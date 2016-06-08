var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Article = new mongoose.Schema({
	title: String,
	author: String,
	visits: {
		type: Number,
		default: 0
	},
	type: String,
	tags: String,
	published: Boolean,
	introduction: String,
	content: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Article', Article);

//     type: {
//       type: Schema.Types.ObjectId,
//       ref: 'articleType'
//     },
//     tags: [{
//       type: Schema.Types.ObjectId,
//       ref: 'articleTag'
//     }],
