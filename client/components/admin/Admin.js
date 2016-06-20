var React = require('react'),
		FormValidation = require('../utils/formValidation'),
		ADMINPATH = require('../../config').adminPath;

var Admin = React.createClass({
	getInitialState: function() {
		return {
			validateMsg: '',
			id: '',
			name: '',
			email: ''
		};
	},

	componentDidMount: function() {
		var id = location.search.substring(1).split('=')[1];
		if(id) {
			fetch(ADMINPATH + '/api/admin/' + id)
				.then(function(response) {
					return response.json();
				}).then(function(json) {
					this.setState({
						id: json.data._id,
						name: json.data.name,
						email: json.data.email
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
			msg: '账号不能为空！'
		}, {
			name: 'email',
			rules: ['isEmail'],
			msg: '邮箱格式不正确！'
		}, {
			name: 'password',
			rules: ['isRequired'],
			msg: '密码不能为空！'
		}]);

		if(data) {
			if(this.state.id) {
				fetch(ADMINPATH + '/api/admin/' + this.state.id, {
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
						this.props.history.pushState(null, ADMINPATH + '/adminList')
					}.bind(this), 500);
				}.bind(this));
			} else {
				fetch(ADMINPATH + '/api/admin', {
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
						this.props.history.pushState(null, ADMINPATH + '/adminList')
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
					<label htmlFor="name" className="col-sm-2 control-label">账号：</label>
					<div className="col-sm-10">
						<input type="text" ref="name" id="name" className="form-control" value={this.state.name} onChange={this.changeField.bind(this, 'name')} />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="email" className="col-sm-2 control-label">邮箱：</label>
					<div className="col-sm-10">
						<input type="text" ref="email" id="email" className="form-control" value={this.state.email} onChange={this.changeField.bind(this, 'email')} />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="password" className="col-sm-2 control-label">密码：</label>
					<div className="col-sm-10">
						<input type="password" ref="password" id="password" className="form-control" value={this.state.password} onChange={this.changeField.bind(this, 'password')} />
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

module.exports = Admin;
