var _ = require('lodash'),
		React = require('react'),
		ReactRouter = require('react-router'),
		Link = ReactRouter.Link,
		PageList = require('../PageList'),
		ListFetchMixin = require('../mixins/ListFetchMixin'),
		ADMINPATH = require('../../config').adminPath;

var ArticleTypeList = React.createClass({
	mixins: [ListFetchMixin],

	getInitialState: function() {
		return {
			url: ADMINPATH + '/api/article_type',
			dataList: [],
			pageList: {}
		}
	},

	handleDelete: function(id, e) {
		e.preventDefault();
		fetch(ADMINPATH + '/api/article_type/' + id, {
		  method: 'DELETE'
		}).then(function(response) {
			return response.json();
		}).then(function(json) {
			var arr = this.state.dataList;
			_.remove(arr, {_id: id})
			this.setState({
				dataList: arr
			});
		}.bind(this));
	},

	render: function() {
		var pageList = this.state.pageList,
				rowCount = pageList.rowCount,
				currentPage = pageList.currentPage,
				pageCount = pageList.pageCount,
				pageRange = pageList.pageRange,
				pageSize = pageList.pageSize;

		var articleTypeList = this.state.dataList.map(function(articleType, index){
			var num = (currentPage - 1) * pageSize + index + 1;
			return (
				<tr key={num}>
					<td>{num}</td>
					<td>{articleType.name}</td>
					<td>{articleType.path}</td>
					<td>{articleType.enabled ? '是' : '否'}</td>
					<td>
						<Link to={ADMINPATH + "/articleType"} query={{id: articleType._id}}>编辑</Link>&nbsp;&nbsp;
						<a href="#" onClick={this.handleDelete.bind(this, articleType._id)}>删除</a>
					</td>
				</tr>
			)
		}.bind(this));

		return (
			<section className="article-type-list">
				<Link to={ADMINPATH + "/articleType"} className="btn btn-default">新增</Link>
				<table className="table">
					<thead>
						<tr><th>序号</th><th>名称</th><th>路径</th><th>是否启用</th><th>操作</th></tr>
					</thead>
					<tbody>
						{articleTypeList}
					</tbody>
				</table>
				<PageList rowCount={rowCount} currentPage={currentPage} pageCount={pageCount} pageRange={pageRange} path={ADMINPATH + '/articleTagList'} />
			</section>
		);
	}
});

module.exports = ArticleTypeList;
