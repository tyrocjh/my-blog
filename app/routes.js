var React = require('react'),
		ReactDOM = require('react-dom'),
		ReactRouter = require('react-router'),
		Layout = require('./components/Layout'),
		ArticleList = require('./components/ArticleList'),
		AdminLayout = require('./components/admin/Layout'),
		AdminWelcome = require('./components/admin/Welcome'),
		AdminBlogInfo = require('./components/admin/BlogInfo'),
		AdminArticleTag = require('./components/admin/ArticleTag'),
		AdminArticleTagList = require('./components/admin/ArticleTagList'),
		NotFound = require('./components/NotFound'),
		ADMINPATH = require('./config').adminPath;

var	Router = ReactRouter.Router,
		Route = ReactRouter.Route,
		IndexRoute = ReactRouter.IndexRoute;

module.exports = (
	<Router>
		<Route path="/" component={Layout}>
			<IndexRoute component={ArticleList} />
		</Route>
		<Route path={ADMINPATH} component={AdminLayout}>
			<IndexRoute component={AdminWelcome} />
			<Route path="blogInfo" component={AdminBlogInfo} />
			<Route path="articleTag" component={AdminArticleTag} />
			<Route path="articleTagList" component={AdminArticleTagList} />
		</Route>
		<Route path="*" component={NotFound} status={404} />
	</Router>
);
