var React = require('react');

var Header = React.createClass({
	render: function() {
		return (
			<header id="header">
				<div className="container">
				  <h1><a href="#"></a></h1>
				  <nav>
				  	<Link to="/">主页</Link>
				  	<Link to="/singlePage" query={{path: 'api'}}>API</Link>
				  	<Link to="/singlePage" query={{path: 'about'}}>关于</Link>
				  </nav>
				</div>
			</header>
		);
	}
});

module.exports = Header;
