var React = require('react'),
		ReactDOM = require('react-dom'),
		ReactRouter = require('react-router'),
		Layout = require('./components/Layout'),
		ArticleList = require('./components/ArticleList');

var	Router = ReactRouter.Router,
		Route = ReactRouter.Route,
		IndexRoute = ReactRouter.IndexRoute;

module.exports = (
	<Router>
		<Route path="/" component={Layout}>
			<IndexRoute component={ArticleList} />
		</Route>
	</Router>
);
