var React = require('react'),
		AdminPath = require('../../config').adminPath;

var Header = React.createClass({
	render: function() {
		return (
			<header>
				<div className="container">
				  <h1><a href="/">My Blog 后台管理</a></h1>
				  <nav>
				  	<a href={AdminPath + "blogInfo"}>博客信息</a>
				  	<a href={AdminPath + "articleList"}>文章</a>
				  	<a href={AdminPath + "articleTypeList"}>文章类型</a>
				  	<a href={AdminPath + "articleTagList"}>标签云</a>
				  	<a href={AdminPath + "commentList"}>评论</a>
				  	<a href={AdminPath + "singlePageList"}>单页面</a>
				  	<a href={AdminPath + "userList"}>用户</a>
				  	<a href={AdminPath + "adminList"}>管理员</a>
				  	<a href={AdminPath + "linkList"}>友情链接</a>
				  </nav>
				</div>
			</header>
		);
	}
});

module.exports = Header;
