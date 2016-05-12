var React = require('react');
var FormValidation = require('../utils/formValidation');

var BlogInfo = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		data = FormValidation(this, [{
				name: 'title',
				rule: ['isRequired'],
				msg: '标题不能为空！'
			}, {
				name: 'keywords',
				rule: ['isRequired'],
				msg: '关键词不能为空！'
			}, {
				name: 'description',
				rule: ['isRequired'],
				msg: '描述不能为空！'
			}, {
				name: 'copyright',
				rule: ['isRequired'],
				msg: '版权不能为空！'
			}
		]);
	},

	render: function() {
		return (
			<form className="form-horizontal col-sm-6" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<div className="col-sm-10 col-sm-offset-2"><h3>博客信息管理</h3></div>
				</div>
				<div className="form-group">
					<label htmlFor="title" className="col-sm-2 control-label">标题：</label>
					<div className="col-sm-10"><input type="text" ref="title" id="title" className="form-control" /></div>
				</div>
				<div className="form-group">
					<label htmlFor="keywords" className="col-sm-2 control-label">关键词：</label>
					<div className="col-sm-10"><textarea ref="keywords" id="keywords" className="form-control"></textarea></div>
				</div>
				<div className="form-group">
					<label htmlFor="description" className="col-sm-2 control-label">描述：</label>
					<div className="col-sm-10"><textarea ref="description" id="description" className="form-control"></textarea></div>
				</div>
				<div className="form-group">
					<label htmlFor="copyright" className="col-sm-2 control-label">版权：</label>
					<div className="col-sm-10"><textarea ref="copyright" id="copyright" className="form-control"></textarea></div>
				</div>
				<div className="form-group">
					<div className="col-sm-10 col-sm-offset-2">
						<button type="submit" className="btn btn-default">确定</button>
					</div>
				</div>
			</form>
		);
	}
});

module.exports = BlogInfo;
