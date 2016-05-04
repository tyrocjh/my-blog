var Router = require('react');

var Layout = React.createClass({
	render: function() {
		return (
			<div>
				<span>test</span>
				{this.props.children}
			<div>
		);
	}
});

module.exports = Layout;
