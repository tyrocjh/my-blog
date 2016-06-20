var React = require('react'),
		FormValidation = require('../utils/formValidation'),
		ADMINPATH = require('../../config').adminPath;

var ArticleTag = React.createClass({
	getInitialState: function() {
		return {
			validateMsg: '',
			id: '',
			name: '',
			path: ''
		};
	},

	componentDidMount: function() {
		var id = location.search.substring(1).split('=')[1];
		if(id) {
			fetch(ADMINPATH + '/api/article_tag/' + id)
				.then(function(response) {
					return response.json();
				}).then(function(json) {
					this.setState({
						id: json.data._id,
						name: json.data.name,
						path: json.data.path
					});
				}.bind(this)).catch(function(ex) {
					console.log('parsing failed', ex);
				});
		}
	},

	changeField: function(field, e) {
		var change = {};
		change[field] = e.target.value;
		this.setState(change);
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
				fetch(ADMINPATH + '/api/article_tag/' + this.state.id, {
				  method: 'PUT',
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
					setTimeout(function() {
						this.props.history.pushState(null, ADMINPATH + '/articleTagList')
					}.bind(this), 500);
				}.bind(this));
			} else {
				fetch(ADMINPATH + '/api/article_tag', {
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
					setTimeout(function() {
						this.props.history.pushState(null, ADMINPATH + '/articleTagList')
					}.bind(this), 500);
				}.bind(this));
			}
		}
	},

	render: function() {
		return (
			<form className="form-horizontal col-sm-5" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<div className="col-sm-10 col-sm-offset-2"><h3>{this.state.id ? '修改' : '新增'}标签</h3></div>
				</div>
				<div className="form-group">
					<label htmlFor="name" className="col-sm-2 control-label">名称：</label>
					<div className="col-sm-10">
						<input type="text" ref="name" id="name" className="form-control" value={this.state.name} onChange={this.changeField.bind(this, 'name')} />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="path" className="col-sm-2 control-label">路径：</label>
					<div className="col-sm-10">
						<input type="text" ref="path" id="path" className="form-control" value={this.state.path} onChange={this.changeField.bind(this, 'path')} />
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
