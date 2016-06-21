var React = require('react'),
		FormValidation = require('../utils/formValidation'),
		Auth = require('../utils/auth'),
		ADMINPATH = require('../../config').adminPath;

var Article = React.createClass({
	getInitialState: function() {
		return {
			validateMsg: '',
			initTypes: [],
			initTags: []
		};
	},

	componentDidMount: function() {
		var id = location.search.substring(1).split('=')[1];
		fetch(ADMINPATH + '/api/article/' + id, {
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
				id: json.data.model._id,
				title: json.data.model.title,
				author: json.data.model.author,
				_type: json.data.model._type,
				tags: json.data.model.tags,
				published: json.data.model.published,
				introduction: json.data.model.introduction,
				content: json.data.model.content,
				initTypes: json.data.types,
				initTags: json.data.tags
			});

			this.useCKeditor();
		}.bind(this)).catch(function(ex) {
			console.log('parsing failed', ex);
		});
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
		}, {
			names: 'tags'
		}]);

		if(data) {
			data.published = this.refs.published.value;
			data._type = this.refs.types.value;
			data.introduction = CKEDITOR.instances.introduction.getData();
			data.content = CKEDITOR.instances.content.getData();

			if(this.state.id) {
				fetch(ADMINPATH + '/api/article/' + this.state.id, {
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
						this.props.history.pushState(null, ADMINPATH + '/articleList')
					}.bind(this), 500);
				}.bind(this));
			} else {
				fetch(ADMINPATH + '/api/article', {
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
					<label className="col-sm-2 control-label">所属类别：</label>
					<div className="col-sm-10">
						<select className="form-control" ref="types" value={this.state._type} onChange={this.changeField.bind(this, '_type')}>
							{this.state.initTypes.map(function(type, index){
								return (
									<option key={index} value={type._id}>{type.name}</option>
								)
							})}
						</select>
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-2 control-label">标签：</label>
					<div className="col-sm-10">
						<div className="checkbox">
							{this.state.initTags.map(function(tag, index) {
								return (
									<label key={index}>
										<input ref={'tags'+index} type="checkbox" value={tag._id} defaultChecked={ this.state.tags && ~this.state.tags.indexOf(tag._id) ? true : false} />{tag.name}
									</label>
								);
							}.bind(this))}
					  </div>
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-2 control-label">是否启用：</label>
					<div className="col-sm-10">
						<select className="form-control" ref="published" value={this.state.published} onChange={this.changeField.bind(this, 'published')}>
							<option value={true}>是</option>
							<option value={false}>否</option>
						</select>
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
