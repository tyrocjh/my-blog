var React = require('react'),
		Header = require('./Header'),
		Footer = require('./Footer');

var Layout = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				{this.props.children}
				<Footer />
			</div>
		);
	}
});

module.exports = Layout;
