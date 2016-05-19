var React = require('react');
var FormValidation = require('../utils/formValidation');

var BlogInfo = React.createClass({
	getInitialState: function() {
		return {
			validateMsg: null
		}
	},

	componentDidMount: function() {
		fetch('/admin/blog_info')
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
				msg: '版权不能为空！'
			}
		]);

		if(data) {
			// console.info(data);
			if(this.state.id) {
				console.info('yes');
				fetch('/admin/blog_info', {
				  method: 'PUT',
				  body: data
				})
			} else {
				console.info('no');
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
					<div className="col-sm-10"><input type="text" ref="title" id="title" className="form-control" value={this.state.title} /></div>
				</div>
				<div className="form-group">
					<label htmlFor="keywords" className="col-sm-2 control-label">关键词：</label>
					<div className="col-sm-10"><textarea ref="keywords" id="keywords" className="form-control" value={this.state.keywords}></textarea></div>
				</div>
				<div className="form-group">
					<label htmlFor="description" className="col-sm-2 control-label">描述：</label>
					<div className="col-sm-10"><textarea ref="description" id="description" className="form-control" value={this.state.description}></textarea></div>
				</div>
				<div className="form-group">
					<label htmlFor="copyright" className="col-sm-2 control-label">版权：</label>
					<div className="col-sm-10"><textarea ref="copyright" id="copyright" className="form-control" value={this.state.copyright}></textarea></div>
				</div>
				<div className="form-group">
					<div className="col-sm-10 col-sm-offset-2">
						<button type="submit" className="btn btn-default">确定</button>
						<span className="errMsg">{this.state.validateMsg}</span>
					</div>
				</div>
			</form>
		);
	}
});

module.exports = BlogInfo;
