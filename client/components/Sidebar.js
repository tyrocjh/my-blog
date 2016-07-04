var React = require('react');

var Sidebar = React.createClass({
	render: function() {
		return (
			<aside className="col-sm-3 sidebar">
				<section>
					<h3>搜索</h3>
					<div id="search">
						<input type="text" className="form-control" placeholder="关键字" />
						<a href="javascript:void(0)" className="btn btn-default">GO</a>
					</div>
				</section>
				<section>
					<h3>标签云</h3>
				</section>
			</aside>
		);
	}
});

module.exports = Sidebar;
