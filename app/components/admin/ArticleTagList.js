var React = require('react'),
		ReactRouter = require('react-router'),
		FormValidation = require('../utils/formValidation'),
		ADMINPATH = require('../../config').adminPath;

var	Link = ReactRouter.Link;

var ArticleTagList = React.createClass({
	getInitialState: function() {
		return {
		}
	},

	componentDidMount: function() {
		// fetch('/admin/blog_info')
		//   .then(function(response) {
		//     return response.json();
		//   }).then(function(json) {
		//     this.setState({
		//     	id: json.data._id,
		//     	title: json.data.title,
		//     	keywords: json.data.keywords,
		//     	description: json.data.description,
		//     	copyright: json.data.copyright
		//     });
		//   }.bind(this)).catch(function(ex) {
		//     console.log('parsing failed', ex);
		//   });
	},

	render: function() {
		return (
			<section class="article-tag-list">
				<Link to={ADMINPATH + "/articleTag"} className="btn btn-default">新增</Link>
				<table className="table">
					<thead>
						<tr><th>序号</th><th>名称</th><th>路径</th><th>操作</th></tr>
					</thead>
					<tbody>
						<tr>
							<td>xuhao</td>
							<td>mingcheng</td>
							<td>lujing</td>
							<td>
								<Link to={ADMINPATH + "/articleTag"}>编辑</Link>&nbsp;&nbsp;
								<a href="javascript:void(0);">删除</a>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		);
	}
});

module.exports = ArticleTagList;
