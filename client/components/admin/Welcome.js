var React = require('react'),
		ADMINPATH = require('../../config').adminPath;

var Welcome = React.createClass({
	getInitialState: function() {
		return {
			name: localStorage.getItem('name')
		}
	},

	render: function() {
		var name = this.state.name;

		return (
			<div>欢迎{name ? ' ' + name + '!' : <Link to={ADMINPATH + '/login'}>请登陆</Link>}</div>
		);
	}
});

module.exports = Welcome;
