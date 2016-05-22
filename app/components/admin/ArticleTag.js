var React = require('react'),
		FormValidation = require('../utils/formValidation');

var ArticleTag = React.createClass({
	getInitialState: function() {
		return {
			validateMsg: null,
			id: '',
			name: '',
			path: ''
		};
	},

	handleSubmit: function(e) {
		e.preventDefault();
		data = FormValidation(this, [{
			name: 'name',
			rules: ['isRequired'],
			msg: '名称不能为空！'
		}, {
			name: 'path',
			rules: ['isRequired'],
			msg: '路径不能为空！'
		}]);

		if(data) {
			if(this.state.id) {
				console.info('has id...');
			} else {
				fetch('/admin/article_tag', {
				  method: 'POST',
				  headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json'
				  },
				  body: JSON.stringify(data)
				}).then(function(response) {
					return response.json();
				}).then(function(json) {
					this.setState({
						validateMsg: json.msg
					});
				}.bind(this));
			}
		}
	},

	render: function() {
		return (
			<form className="form-horizontal col-sm-5" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<div className="col-sm-10 col-sm-offset-2"><h3>新增标签</h3></div>
				</div>
				<div className="form-group">
					<label htmlFor="name" className="col-sm-2 control-label">名称：</label>
					<div className="col-sm-10">
						<input type="text" ref="name" id="name" className="form-control" />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="path" className="col-sm-2 control-label">路径：</label>
					<div className="col-sm-10">
						<input type="text" ref="path" id="path" className="form-control" />
					</div>
				</div>
				<div className="form-group">
					<div className="col-sm-10 col-sm-offset-2">
						<button type="submit" className="btn btn-default">确定</button>
						<span className="validateMsg">{this.state.validateMsg}</span>
					</div>
				</div>
			</form>
		);
	}
});

module.exports = ArticleTag;
