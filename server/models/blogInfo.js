var mongoose = require('mongoose');

var BlogInfo = new mongoose.Schema({
	title: String,
	description: String,
	keywords: String,
	copyright: String
}, {
	timestamps: true
});

module.exports = mongoose.model('BlogInfo', BlogInfo);
