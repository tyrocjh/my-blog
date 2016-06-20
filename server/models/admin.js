var mongoose = require('mongoose'),
		bcrypt = require('bcrypt');

var Admin = new mongoose.Schema({
  img: String,
  name: String,
  email: String,
  password: String
}, {
	timestamps: true
});

Admin.methods.comparePassword = function(password) {
  // return true;
}

Admin.pre('save', function(next) {
  var admin = this;

  // proceed further only if the password is modified or the admin is new
  if (!admin.isModified('password')) return next();

  bcrypt.genSalt(function (err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(admin.password, salt, function(err, hash) {
      if (err) { return next(err); }

      // replace a password string with hash value
      admin.password = hash;

      return next();
    });
  });
});

module.exports = mongoose.model('Admin', Admin);
