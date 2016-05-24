var React = require('react'),
		ReactRouter = require('react-router'),
		FormValidation = require('../utils/formValidation'),
		ADMINPATH = require('../../config').adminPath;

var	Link = ReactRouter.Link;

var ArticleTagList = React.createClass({
	render: function() {
		return (
			// table
			<section class="article-tag-list">
				<Link to={ADMINPATH + "/articleTag"} className="btn btn-default">新增</Link>
				<table class="tmp">
					<thead>
						<tr><th>序号</th><th>名称</th><th>路径</th><th>操作</th></tr>
					</thead>
					<tbody>
						<tr>
							<td>xuhao</td>
							<td>mingcheng</td>
							<td>lujing</td>
							<td>
								<Link to={ADMINPATH + "/articleTag"} className="btn btn-default">编辑</Link>
								<a href="#">删除</a>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		);
	}
});

module.exports = ArticleTagList;
