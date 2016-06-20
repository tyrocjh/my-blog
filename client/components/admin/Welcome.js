var React = require('react');

var Welcome = React.createClass({
	render: function() {
		return (
			<div>Admin Welcome. - {true} - {false} - {true && 'asd'} - {false && 'zxc'}</div>
		);
	}
});

module.exports = Welcome;
