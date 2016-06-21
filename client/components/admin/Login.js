var React = require('react'),
		FormValidation = require('../utils/formValidation'),
		Auth = require('../utils/auth'),
		ADMINPATH = require('../../config').adminPath;

var Login = React.createClass({
	getInitialState: function() {
		return {
			validateMsg: null,
			email: '',
			password: ''
		}
	},

	handleSubmit: function(e) {
		e.preventDefault();
		data = FormValidation(this, [{
				name: 'email',
				rules: ['isRequired'],
				msg: '邮箱不能为空！'
			}, {
				name: 'password',
				rules: ['isRequired'],
				msg: '密码不能为空！'
			}
		]);

		if(data) {
			fetch(ADMINPATH + '/login', {
			  method: 'POST',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			  body: JSON.stringify(data)
			}).then(function(response) {
				return response.json();
			}).then(function(json) {
				Auth.authenticateUser(json.token);
				localStorage.setItem('name', json.user.name);
				localStorage.setItem('email', json.user.email);
				this.setState({
					validateMsg: json.msg
				});
				this.redirect();
			}.bind(this));
		}
	},

	redirect: function() {
		var propState = this.props.location.state;
		var defaultPrevPath = '/admin'
		var prevPath = propState && propState.prevPath;
		this.props.history.replaceState(null, prevPath || defaultPrevPath);
	},

	render: function() {
		return (
			<form className="form-horizontal col-sm-6" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<div className="col-sm-10 col-sm-offset-2"><h3>登录</h3></div>
				</div>
				<div className="form-group">
					<label htmlFor="email" className="col-sm-2 control-label">邮箱：</label>
					<div className="col-sm-10">
						<input type="text" ref="email" id="email" className="form-control" />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="password" className="col-sm-2 control-label">密码：</label>
					<div className="col-sm-10">
						<input type="password" ref="password" id="password" className="form-control" />
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

module.exports = Login;
