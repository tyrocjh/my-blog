var React = require('react'),
		ReactDOM = require('react-dom'),
		ReactRouter = require('react-router'),
		Layout = require('./components/Layout'),
		ArticleList = require('./components/ArticleList'),
		SinglePage = require('./components/SinglePage'),
		AdminLayout = require('./components/admin/Layout'),
		AdminWelcome = require('./components/admin/Welcome'),
		AdminLogin = require('./components/admin/Login'),
		AdminAdmin = require('./components/admin/Admin'),
		AdminAdminList = require('./components/admin/AdminList'),
		AdminBlogInfo = require('./components/admin/BlogInfo'),
		AdminArticle = require('./components/admin/Article'),
		AdminArticleList = require('./components/admin/ArticleList'),
		AdminArticleType = require('./components/admin/ArticleType'),
		AdminArticleTypeList = require('./components/admin/ArticleTypeList'),
		AdminArticleTag = require('./components/admin/ArticleTag'),
		AdminArticleTagList = require('./components/admin/ArticleTagList'),
		AdminSinglePage = require('./components/admin/SinglePage'),
		AdminSinglePageList = require('./components/admin/SinglePageList'),
		AdminLink = require('./components/admin/Link'),
		AdminLinkList = require('./components/admin/LinkList'),
		NotFound = require('./components/NotFound'),
		Auth = require('./components/utils/auth'),
		ADMINPATH = require('./config').adminPath;

var	Router = ReactRouter.Router,
		Route = ReactRouter.Route,
		IndexRoute = ReactRouter.IndexRoute;

var requireAuth = function(nextState, replaceState) {
	if(!Auth.isUserAuthenticated()) {
		var prevPath = nextState.location.pathname;
		replaceState({prevPath: prevPath}, '/admin/login');
	}
}

module.exports = (
	<Router>
		<Route path="/" component={Layout}>
			<IndexRoute component={ArticleList} />
			<Route path="singlePage" component={SinglePage} />
		</Route>
		<Route path={ADMINPATH} component={AdminLayout}>
			<IndexRoute component={AdminWelcome} />
			<Route path="login" component={AdminLogin} />
			<Route path="admin" component={AdminAdmin} onEnter={requireAuth} />
			<Route path="adminList" component={AdminAdminList} onEnter={requireAuth} />
			<Route path="blogInfo" component={AdminBlogInfo} onEnter={requireAuth} />
			<Route path="article" component={AdminArticle} onEnter={requireAuth} />
			<Route path="articleList" component={AdminArticleList} onEnter={requireAuth} />
			<Route path="articleType" component={AdminArticleType} onEnter={requireAuth} />
			<Route path="articleTypeList" component={AdminArticleTypeList} onEnter={requireAuth} />
			<Route path="articleTag" component={AdminArticleTag} onEnter={requireAuth} />
			<Route path="articleTagList" component={AdminArticleTagList} onEnter={requireAuth} />
			<Route path="singlePage" component={AdminSinglePage} onEnter={requireAuth} />
			<Route path="singlePageList" component={AdminSinglePageList} onEnter={requireAuth} />
			<Route path="link" component={AdminLink} onEnter={requireAuth} />
			<Route path="linkList" component={AdminLinkList} onEnter={requireAuth} />
		</Route>
		<Route path="*" component={NotFound} status={404} />
	</Router>
);
