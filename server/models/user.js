var mongoose = require('mongoose');

var User = new mongoose.Schema({
	img: String,
	name: String,
	email: String
});

module.exports = mongoose.model('User', User);
