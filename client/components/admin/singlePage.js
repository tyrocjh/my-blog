var React = require('react'),
		FormValidation = require('../utils/formValidation'),
		Auth = require('../utils/auth'),
		ADMINPATH = require('../../config').adminPath;

var SinglePage = React.createClass({
	getInitialState: function() {
		return {
			validateMsg: '',
			id: '',
			title: '',
			path: ''
		};
	},

	componentDidMount: function() {
		var id = location.search.substring(1).split('=')[1];
		if(id) {
			fetch(ADMINPATH + '/api/single_page/' + id, {
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
					title: json.data.title,
					path: json.data.path,
					content: json.data.content
				});

				this.useCKeditor();
			}.bind(this)).catch(function(ex) {
				console.log('parsing failed', ex);
			});
		} else {
			this.useCKeditor();
		}
	},
	
	useCKeditor: function() {
		this.triggerCKeditor('content');
	},

	triggerCKeditor: function(field) {
		CKEDITOR.replace(field, {
		  filebrowserImageUploadUrl: ADMINPATH + '/api/upload',
		  extraPlugins: 'image2',
			height: 300
		}).setData(this.state[field]);
	},

	changeField: function(field, e) {
		var change = {};
		change[field] = e.target.value;
		this.setState(change);
	},

	handleSubmit: function(e) {
		e.preventDefault();
		data = FormValidation(this, [{
			name: 'title',
			rules: ['isRequired'],
			msg: '名称不能为空！'
		}, {
			name: 'path',
			rules: ['isRequired'],
			msg: '路径不能为空！'
		}]);

		if(data) {
			data.content = CKEDITOR.instances.content.getData();
			if(this.state.id) {
				fetch(ADMINPATH + '/api/single_page/' + this.state.id, {
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
						this.props.history.pushState(null, ADMINPATH + '/singlePageList')
					}.bind(this), 500);
				}.bind(this));
			} else {
				fetch(ADMINPATH + '/api/single_page', {
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
						this.props.history.pushState(null, ADMINPATH + '/singlePageList')
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
					<label htmlFor="title" className="col-sm-2 control-label">名称：</label>
					<div className="col-sm-10">
						<input type="text" ref="title" id="title" className="form-control" value={this.state.title} onChange={this.changeField.bind(this, 'title')} />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="path" className="col-sm-2 control-label">路径：</label>
					<div className="col-sm-10">
						<input type="text" ref="path" id="path" className="form-control" value={this.state.path} onChange={this.changeField.bind(this, 'path')} />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="content" className="col-sm-2 control-label">内容：</label>
					<div className="col-sm-10">
						<input type="text" ref="content" id="content" className="form-control" value={this.state.content} onChange={this.changeField.bind(this, 'content')} />
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

module.exports = SinglePage;
