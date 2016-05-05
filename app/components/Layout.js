var React = require('react');

var Layout = React.createClass({
	render: function() {
		return (
			<div>
				<span>I am Layout.</span>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Layout;
