var mongoose = require('mongoose');

var SinglePage = new mongoose.Schema({
	title: String,
	path: String,
	content: String
}, {
	timestamps: true
});

module.exports = mongoose.model('SinglePage', SinglePage);
