var _ = require('lodash'),
		React = require('react'),
		ReactRouter = require('react-router'),
		Link = ReactRouter.Link,
		PageList = require('../PageList');
		FormValidation = require('../utils/formValidation'),
		ADMINPATH = require('../../config').adminPath;

var ArticleTagList = React.createClass({
	getInitialState: function() {
		return {
			articleTagList: [],
			pageList: {}
		}
	},

	componentDidMount: function() {
		fetch(ADMINPATH + '/article_tag' + location.search)
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					articleTagList: json.data.dataList,
					pageList: json.data.pageList
				});
			}.bind(this)).catch(function(ex) {
				console.log('parsing failed', ex);
			});
	},

	componentWillReceiveProps: function() {
		fetch(ADMINPATH + '/article_tag' + location.search)
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					articleTagList: json.data.dataList,
					pageList: json.data.pageList
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
		var rowCount = this.state.pageList.rowCount;
		var currentPage = this.state.pageList.currentPage;
		var pageCount = this.state.pageList.pageCount;
		var pageRange = this.state.pageList.pageRange;
		var pageSize = this.state.pageList.pageSize;

		var articleTagList = this.state.articleTagList.map(function(articleTag, index) {
			return (
				<tr key={index}>
					<td>{(currentPage - 1) * pageSize + index + 1}</td>
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
				<PageList rowCount={rowCount} currentPage={currentPage} pageCount={pageCount} pageRange={pageRange} path={ADMINPATH + '/articleTagList'} />
			</section>
		);
	}
});

module.exports = ArticleTagList;
