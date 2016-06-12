var React = require('react'),
		FormValidation = require('../utils/formValidation'),
		ADMINPATH = require('../../config').adminPath;

var Article = React.createClass({
	getInitialState: function() {
		return {
			validateMsg: ''
		};
	},

	componentDidMount: function() {
		var id = location.search.substring(1).split('=')[1];
		if(id) {
			fetch(ADMINPATH + '/api/article/' + id)
				.then(function(response) {
					return response.json();
				}).then(function(json) {
					this.setState({
						id: json.data._id,
						title: json.data.title,
						author: json.data.author,
						published: json.data.published,
						introduction: json.data.introduction,
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
		this.triggerCKeditor('introduction');
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
			msg: '标题不能为空！'
		}, {
			name: 'author',
			rules: ['isRequired'],
			msg: '作者不能为空！'
		}]);

		if(data) {
			data.introduction = CKEDITOR.instances.introduction.getData();
			data.content = CKEDITOR.instances.content.getData();

			if(this.state.id) {
				fetch(ADMINPATH + '/api/article/' + this.state.id, {
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
						this.props.history.pushState(null, ADMINPATH + '/articleList')
					}.bind(this), 500);
				}.bind(this));
			} else {
				fetch(ADMINPATH + '/api/article', {
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
						this.props.history.pushState(null, ADMINPATH + '/articleList')
					}.bind(this), 500);
				}.bind(this));
			}
		}
	},

	render: function() {
		return (
			<form className="form-horizontal col-sm-5" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<div className="col-sm-10 col-sm-offset-2"><h3>{this.state.id ? '修改' : '新增'}文章</h3></div>
				</div>
				<div className="form-group">
					<label htmlFor="title" className="col-sm-2 control-label">标题：</label>
					<div className="col-sm-10">
						<input type="text" ref="title" id="title" className="form-control" value={this.state.title} onChange={this.changeField.bind(this, 'title')} />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="author" className="col-sm-2 control-label">作者：</label>
					<div className="col-sm-10">
						<input type="text" ref="author" id="author" className="form-control" value={this.state.author} onChange={this.changeField.bind(this, 'author')} />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="introduction" className="col-sm-2 control-label">简介：</label>
					<div className="col-sm-10">
						<input type="text" ref="introduction" id="introduction" className="form-control" value={this.state.introduction} onChange={this.changeField.bind(this, 'introduction')} />
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
		)
	}
});

module.exports = Article;
