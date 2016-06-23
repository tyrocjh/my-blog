var mongoose = require('mongoose');

var Link = new mongoose.Schema({
	name: String,
	url: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Link', Link);
