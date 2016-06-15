var _ = require('lodash'),
		React = require('react'),
		ReactRouter = require('react-router'),
		Link = ReactRouter.Link,
		PageList = require('../PageList'),
		ListFetchMixin = require('../mixins/ListFetchMixin'),
		ADMINPATH = require('../../config').adminPath;

var AdminList = React.createClass({
	mixins: [ListFetchMixin],

	getInitialState: function() {
		return {
			url: ADMINPATH + '/api/admin',
			dataList: [],
			pageList: {}
		}
	},

	handleDelete: function(id, e) {
		e.preventDefault();
		fetch(ADMINPATH + '/api/admin/' + id, {
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

		var AdminList = this.state.dataList.map(function(admin, index){
			var num = (currentPage - 1) * pageSize + index + 1;
			return (
				<tr key={num}>
					<td>{num}</td>
					<td>{admin.name}</td>
					<td>{admin.email}</td>
					<td>
						<Link to={ADMINPATH + "/admin"} query={{id: admin._id}}>编辑</Link>&nbsp;&nbsp;
						<a href="#" onClick={this.handleDelete.bind(this, admin._id)}>删除</a>
					</td>
				</tr>
			)
		}.bind(this));

		return (
			<section className="article-type-list">
				<Link to={ADMINPATH + "/admin"} className="btn btn-default">新增</Link>
				<table className="table">
					<thead>
						<tr><th>序号</th><th>账号</th><th>邮箱</th><th>操作</th></tr>
					</thead>
					<tbody>
						{AdminList}
					</tbody>
				</table>
				<PageList rowCount={rowCount} currentPage={currentPage} pageCount={pageCount} pageRange={pageRange} path={ADMINPATH + '/admin'} />
			</section>
		);
	}
});

module.exports = AdminList;
