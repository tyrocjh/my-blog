var _ = require('lodash'),
		React = require('react'),
		ReactRouter = require('react-router'),
		Link = ReactRouter.Link,
		PageList = require('../PageList'),
		ListFetchMixin = require('../mixins/ListFetchMixin'),
		Auth = require('../utils/auth'),
		ADMINPATH = require('../../config').adminPath;

var SinglePageList = React.createClass({
	mixins: [ListFetchMixin],

	getInitialState: function() {
		return {
			url: ADMINPATH + '/api/single_page',
			dataList: [],
			pageList: {}
		}
	},

	handleDelete: function(id, e) {
		e.preventDefault();
		fetch(ADMINPATH + '/api/single_page/' + id, {
		  method: 'DELETE',
		  headers: {
		  	'Authorization': Auth.getToken(),
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  }
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

		var singlePageList = this.state.dataList.map(function(singlePage, index){
			var num = (currentPage - 1) * pageSize + index + 1;
			return (
				<tr key={num}>
					<td>{num}</td>
					<td>{singlePage.title}</td>
					<td>{singlePage.path}</td>
					<td>{singlePage.enabled ? '是' : '否'}</td>
					<td>
						<Link to={ADMINPATH + "/singlePage"} query={{id: singlePage._id}}>编辑</Link>&nbsp;&nbsp;
						<a href="#" onClick={this.handleDelete.bind(this, singlePage._id)}>删除</a>
					</td>
				</tr>
			)
		}.bind(this));

		return (
			<section className="single-page-list">
				<Link to={ADMINPATH + "/singlePage"} className="btn btn-default">新增</Link>
				<table className="table">
					<thead>
						<tr><th>序号</th><th>名称</th><th>路径</th><th>是否启用</th><th>操作</th></tr>
					</thead>
					<tbody>
						{singlePageList}
					</tbody>
				</table>
				<PageList rowCount={rowCount} currentPage={currentPage} pageCount={pageCount} pageRange={pageRange} path={ADMINPATH + '/singlePageList'} />
			</section>
		);
	}
});

module.exports = SinglePageList;
