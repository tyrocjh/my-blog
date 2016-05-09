var React = require('react');

var BlogInfo = React.createClass({
	render: function() {
		return (
			<form className="form-horizontal col-sm-6">
				<div className="form-group">
					<div className="col-sm-10 col-sm-offset-2"><h3>博客信息管理</h3></div>
				</div>
				<div className="form-group">
					<label htmlFor="title" className="col-sm-2 control-label">标题：</label>
					<div className="col-sm-10"><input type="text" id="title" className="form-control" /></div>
				</div>
				<div className="form-group">
					<label htmlFor="keywords" className="col-sm-2 control-label">关键词：</label>
					<div className="col-sm-10"><textarea id="keywords" className="form-control"></textarea></div>
				</div>
				<div className="form-group">
					<label htmlFor="description" className="col-sm-2 control-label">描述：</label>
					<div className="col-sm-10"><textarea id="description" className="form-control"></textarea></div>
				</div>
				<div className="form-group">
					<label htmlFor="copyright" className="col-sm-2 control-label">版权：</label>
					<div className="col-sm-10"><textarea id="copyright" className="form-control"></textarea></div>
				</div>
				<div className="form-group">
					<div className="col-sm-10 col-sm-offset-2">
						<button className="btn btn-default">确定</button>
					</div>
				</div>
			</form>
		);
	}
});

module.exports = BlogInfo;
