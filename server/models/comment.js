var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var Comment = new mongoose.Schema({
	article: {
		id: Schema.Types.ObjectId,
		typePath: String
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	admin: {
		type: Schema.Types.ObjectId,
		ref: 'admin'
	},
	content: String,
	enabled: Boolean
}, {
	timestamps: true
});

module.exports = mongoose.model('Comment', Comment);
