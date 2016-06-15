var React = require('react'),
		ReactDOM = require('react-dom'),
		ReactRouter = require('react-router'),
		Layout = require('./components/Layout'),
		ArticleList = require('./components/ArticleList'),
		AdminLayout = require('./components/admin/Layout'),
		AdminWelcome = require('./components/admin/Welcome'),
		AdminAdmin = require('./components/admin/Admin'),
		AdminAdminList = require('./components/admin/AdminList'),
		AdminBlogInfo = require('./components/admin/BlogInfo'),
		AdminArticle = require('./components/admin/Article'),
		AdminArticleList = require('./components/admin/ArticleList'),
		AdminArticleType = require('./components/admin/ArticleType'),
		AdminArticleTypeList = require('./components/admin/ArticleTypeList'),
		AdminArticleTag = require('./components/admin/ArticleTag'),
		AdminArticleTagList = require('./components/admin/ArticleTagList'),
		AdminSinglePage = require('./components/admin/singlePage'),
		AdminSinglePageList = require('./components/admin/singlePageList'),
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
			<Route path="admin" component={AdminAdmin} />
			<Route path="adminList" component={AdminAdminList} />
			<Route path="article" component={AdminArticle} />
			<Route path="articleList" component={AdminArticleList} />
			<Route path="articleType" component={AdminArticleType} />
			<Route path="articleTypeList" component={AdminArticleTypeList} />
			<Route path="articleTag" component={AdminArticleTag} />
			<Route path="articleTagList" component={AdminArticleTagList} />
			<Route path="singlePage" component={AdminSinglePage} />
			<Route path="singlePageList" component={AdminSinglePageList} />
		</Route>
		<Route path="*" component={NotFound} status={404} />
	</Router>
);
