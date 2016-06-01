var _ = require('lodash'),
		React = require('react'),
		ReactRouter = require('react-router'),
		PageList = require('../PageList');
		FormValidation = require('../utils/formValidation'),
		ADMINPATH = require('../../config').adminPath;

var	Link = ReactRouter.Link;

var ArticleTagList = React.createClass({
	getInitialState: function() {
		return {
			articleTagList: [],
			pageList: {
				rowCount: 100,
				currentPage: 5,
				pageCount: 10,
				pageRange: 3
			}
		}
	},

	componentDidMount: function() {
		fetch(ADMINPATH + '/article_tag')
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					articleTagList: json.data
				});
			}.bind(this)).catch(function(ex) {
				console.log('parsing failed', ex);
			});
	},

	handleDelete: function(id, e) {
		e.preventDefault();
		fetch(ADMINPATH + '/article_tag/' + id, {
		  method: 'DELETE'
		}).then(function(response) {
			return response.json();
		}).then(function(json) {
			var arr = this.state.articleTagList;
			_.remove(arr, {_id: id})
			this.setState({
				articleTagList: arr
			});
		}.bind(this));
	},

	render: function() {
		var articleTagList = this.state.articleTagList.map(function(articleTag, index) {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{articleTag.name}</td>
					<td>{articleTag.path}</td>
					<td>
						<Link to={ADMINPATH + "/articleTag"} query={{id: articleTag._id}}>编辑</Link>&nbsp;&nbsp;
						<a href="#" onClick={this.handleDelete.bind(this, articleTag._id)}>删除</a>
					</td>
				</tr>
			)
		}.bind(this));

		return (
			<section className="article-tag-list">
				<Link to={ADMINPATH + "/articleTag"} className="btn btn-default">新增</Link>
				<table className="table">
					<thead>
						<tr><th>序号</th><th>名称</th><th>路径</th><th>操作</th></tr>
					</thead>
					<tbody>
						{articleTagList}
					</tbody>
				</table>
				<PageList rowCount={this.state.pageList.rowCount} 
									currentPage={this.state.pageList.currentPage} 
									pageCount={this.state.pageList.pageCount} 
									pageRange={this.state.pageList.pageRange} 
									path={ADMINPATH + '/articleTagList'} />
			</section>
		);
	}
});

module.exports = ArticleTagList;
