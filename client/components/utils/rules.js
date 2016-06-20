module.exports = {
	isRequired: function(val) {
		return val.trim() !== ''
	},

	isEmail: function(val) {
		return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(val)
	}
}
