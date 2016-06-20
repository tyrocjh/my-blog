var React = require('react'),
		FormValidation = require('../utils/formValidation'),
		ADMINPATH = require('../../config').adminPath;

var BlogInfo = React.createClass({
	getInitialState: function() {
		return {
			validateMsg: null,
			id: '',
			title: '',
			keywords: '',
			description: '',
			copyright: ''
		}
	},

	componentDidMount: function() {
		fetch(ADMINPATH + '/api/blog_info')
		  .then(function(response) {
		    return response.json();
		  }).then(function(json) {
		    this.setState({
		    	id: json.data._id,
		    	title: json.data.title,
		    	keywords: json.data.keywords,
		    	description: json.data.description,
		    	copyright: json.data.copyright
		    });
		  }.bind(this)).catch(function(ex) {
		    console.log('parsing failed', ex);
		  });
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
				name: 'keywords',
				rules: ['isRequired'],
				msg: '关键词不能为空！'
			}, {
				name: 'description',
				rules: ['isRequired'],
				msg: '描述不能为空！'
			}, {
				name: 'copyright',
				rules: ['isRequired'],
				msg: '描述不能为空！'
			}
		]);

		if(data) {
			if(this.state.id) {
				data['_id'] = this.state.id;
				fetch(ADMINPATH + '/api/blog_info', {
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
				}.bind(this));
			} else {
				fetch(ADMINPATH + '/api/blog_info', {
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
			<form className="form-horizontal col-sm-6" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<div className="col-sm-10 col-sm-offset-2"><h3>博客信息管理</h3></div>
				</div>
				<div className="form-group">
					<label htmlFor="title" className="col-sm-2 control-label">标题：</label>
					<div className="col-sm-10">
						<input type="text" ref="title" id="title" className="form-control" value={this.state.title} onChange={this.changeField.bind(this, 'title')} />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="keywords" className="col-sm-2 control-label">关键词：</label>
					<div className="col-sm-10">
						<textarea ref="keywords" id="keywords" className="form-control" value={this.state.keywords} onChange={this.changeField.bind(this, 'keywords')}></textarea>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="description" className="col-sm-2 control-label">描述：</label>
					<div className="col-sm-10">
						<textarea ref="description" id="description" className="form-control" value={this.state.description} onChange={this.changeField.bind(this, 'description')}></textarea>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="copyright" className="col-sm-2 control-label">版权：</label>
					<div className="col-sm-10">
						<textarea ref="copyright" id="copyright" className="form-control" value={this.state.copyright} onChange={this.changeField.bind(this, 'copyright')}></textarea>
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

module.exports = BlogInfo;
