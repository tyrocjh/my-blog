var React = require('react'),
		ReactRouter = require('react-router'),
		ADMINPATH = require('../../config').adminPath;

var	Link = ReactRouter.Link;

var Header = React.createClass({
	render: function() {
		return (
			<header>
				<div className="container">
				  <h1>
				  	<Link to={ADMINPATH}></Link>
				  </h1>
				  <nav>
				  	<Link to={ADMINPATH + '/blogInfo'}>博客信息</Link>
				  	<Link to={ADMINPATH + '/articleList'}>文章</Link>
				  	<Link to={ADMINPATH + '/articleTypeList'}>文章类型</Link>
				  	<Link to={ADMINPATH + '/articleTagList'}>标签云</Link>
				  	<Link to={ADMINPATH + '/commentList'}>评论</Link>
				  	<Link to={ADMINPATH + '/singlePageList'}>单页面</Link>
				  	<Link to={ADMINPATH + '/userList'}>用户</Link>
				  	<Link to={ADMINPATH + '/adminList'}>管理员</Link>
				  	<Link to={ADMINPATH + '/linkList'}>友情链接</Link>
				  </nav>
				</div>
			</header>
		);
	}
});

module.exports = Header;
