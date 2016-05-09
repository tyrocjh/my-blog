var React = require('react'),
		ReactDOM = require('react-dom'),
		ReactRouter = require('react-router'),
		Layout = require('./components/Layout'),
		ArticleList = require('./components/ArticleList'),
		AdminLayout = require('./components/admin/Layout'),
		AdminWelcome = require('./components/admin/Welcome'),
		AdminBlogInfo = require('./components/admin/BlogInfo'),
		NotFound = require('./components/NotFound');

var	Router = ReactRouter.Router,
		Route = ReactRouter.Route,
		IndexRoute = ReactRouter.IndexRoute;

module.exports = (
	<Router>
		<Route path="/" component={Layout}>
			<IndexRoute component={ArticleList} />
		</Route>
		<Route path="/admin" component={AdminLayout}>
			<IndexRoute component={AdminWelcome} />
			<Route path="blogInfo" component={AdminBlogInfo} />
		</Route>
		<Route path="*" component={NotFound} status={404} />
	</Router>
);
