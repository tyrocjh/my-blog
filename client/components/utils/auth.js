module.exports = {
	authenticateUser: function(token) {
		localStorage.setItem('token', token);
	},

	deauthenticateUser: function() {
		localStorage.removeItem('token');
	},

	isUserAuthenticated: function() {
		return localStorage.getItem('token') !== null;
	},

	getToken: function() {
		return localStorage.getItem('token');
	}
}
