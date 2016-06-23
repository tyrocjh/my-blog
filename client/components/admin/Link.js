var React = require('react'),
		FormValidation = require('../utils/formValidation'),
		Auth = require('../utils/auth'),
		ADMINPATH = require('../../config').adminPath;

var Link = React.createClass({
	getInitialState: function() {
		return {
			validateMsg: '',
			id: '',
			name: '',
			url: ''
		};
	},

	componentDidMount: function() {
		var id = location.search.substring(1).split('=')[1];
		if(id) {
			fetch(ADMINPATH + '/api/link/' + id, {
			  method: 'GET',
			  headers: {
			  	'Authorization': Auth.getToken(),
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  }
			}).then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					id: json.data._id,
					name: json.data.name,
					url: json.data.url
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
			name: 'url',
			rules: ['isRequired'],
			msg: 'url不能为空！'
		}]);

		if(data) {
			if(this.state.id) {
				fetch(ADMINPATH + '/api/link/' + this.state.id, {
				  method: 'PUT',
				  headers: {
				  	'Authorization': Auth.getToken(),
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
						this.props.history.pushState(null, ADMINPATH + '/linkList')
					}.bind(this), 500);
				}.bind(this));
			} else {
				fetch(ADMINPATH + '/api/link', {
				  method: 'POST',
				  headers: {
				  	'Authorization': Auth.getToken(),
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
						this.props.history.pushState(null, ADMINPATH + '/linkList')
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
					<label htmlFor="url" className="col-sm-2 control-label">路径：</label>
					<div className="col-sm-10">
						<input type="text" ref="url" id="url" className="form-control" value={this.state.url} onChange={this.changeField.bind(this, 'url')} />
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

module.exports = Link;
