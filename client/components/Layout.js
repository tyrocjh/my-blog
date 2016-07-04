var React = require('react'),
		Header = require('./Header'),
		Footer = require('./Footer');

var Layout = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<div id="main-content">
					{this.props.children}
				</div>
				<Footer />
			</div>
		);
	}
});

module.exports = Layout;
