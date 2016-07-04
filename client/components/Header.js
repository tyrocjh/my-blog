var React = require('react');

var Header = React.createClass({
	render: function() {
		return (
			<header id="header">
				<div className="container">
				  <h1><a href="#"></a></h1>
				  <nav>
				  	<a href="#">主页</a>
				  	<a href="#">Web</a>
				  	<a href="#">杂谈</a>
				  	<a href="#">API</a>
				  	<a href="#">关于</a>
				  </nav>
				</div>
			</header>
		);
	}
});

module.exports = Header;
