var React = require('react'),
		Header = require('./Header'),
		Footer = require('./Footer');

var Layout = React.createClass({
	render: function() {
		return (
			<div id="admin">
				<Header />
				<section className="container">
					{this.props.children}
				</section>
				<Footer />
			</div>
		);
	}
});

module.exports = Layout;
