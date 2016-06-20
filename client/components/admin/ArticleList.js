var _ = require('lodash'),
		moment = require('moment');
		React = require('react'),
		ReactRouter = require('react-router'),
		Link = ReactRouter.Link,
		PageList = require('../PageList'),
		ListFetchMixin = require('../mixins/ListFetchMixin'),
		ADMINPATH = require('../../config').adminPath;

var ArticleList = React.createClass({
	mixins: [ListFetchMixin],

	getInitialState: function() {
		return {
			url: ADMINPATH + '/api/article',
			dataList: [],
			pageList: {}
		}
	},

	handleDelete: function(id, e) {
		e.preventDefault();
		fetch(ADMINPATH + '/api/article/' + id, {
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
		var rowCount = this.state.pageList.rowCount;
		var currentPage = this.state.pageList.currentPage;
		var pageCount = this.state.pageList.pageCount;
		var pageRange = this.state.pageList.pageRange;
		var pageSize = this.state.pageList.pageSize;

		var articleList = this.state.dataList.map(function(article, index) {
			var num = (currentPage - 1) * pageSize + index + 1;
			return (
				<tr key={num}>
					<td>{num}</td>
					<td>{article.title}</td>
					<td>{article.author}</td>
					<td>{article.visits}</td>
					<td>{article._type ? article._type.name : ''}</td>
					<td>
						{article.tags.map(function(tag, index) {
							return (index != 0 ? ', ' : '') + tag.name
						})}
					</td>
					<td>comments count...</td>
					<td>{moment(article.createdAt).format('YYYY-MM-DD HH:mm')}</td>
					<td>{moment(article.updatedAt).format('YYYY-MM-DD HH:mm')}</td>
					<td>{article.published ? '是' : '否'}</td>
					<td>
						<Link to={ADMINPATH + "/article"} query={{id: article._id}}>编辑</Link>&nbsp;&nbsp;
						<a href="#" onClick={this.handleDelete.bind(this, article._id)}>删除</a>
					</td>
				</tr>
			)
		}.bind(this));

		return (
			<section className="article-list">
				<Link to={ADMINPATH + "/article"} className="btn btn-default">新增</Link>
				<table className="table">
					<thead>
						<tr>
							<th>序号</th>
							<th>标题</th>
							<th>作者</th>
							<th>阅读次数</th>
							<th>所属类别</th>
							<th>标签</th>
							<th>留言数</th>
							<th>添加时间</th>
							<th>最后编辑时间</th>
							<th>已发布</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{articleList}
					</tbody>
				</table>
				<PageList rowCount={rowCount} currentPage={currentPage} pageCount={pageCount} pageRange={pageRange} path={ADMINPATH + '/articleList'} />
			</section>
		)
	}
});

module.exports = ArticleList;
