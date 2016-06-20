var mongoose = require('mongoose');

var Admin = new mongoose.Schema({
  img: String,
  name: String,
  email: String,
  password: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Admin', Admin);
