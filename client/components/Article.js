var React = require('react'),
		Sidebar = require('./Sidebar'),
		FormValidation = require('./utils/formValidation'),
		moment = require('moment');

var Article = React.createClass({
	getInitialState: function() {
		return {
			url: 'api/article/',
			model: {},
			tags: [],
			links: []
		}
	},

	componentDidMount: function() {
		var id = location.search.substring(1).split('=')[1];
		fetch(this.state.url + id, {
		  method: 'GET',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  }
		}).then(function(response) {
			return response.json();
		}).then(function(json) {
			this.setState({
				model: json.data.model,
				tags: json.data.tags,
				links: json.data.links
			});
		}.bind(this)).catch(function(ex) {
			console.log('parsing failed', ex);
		});
	},

	handleComment: function(article) {
		data = FormValidation(this, [{
			name: 'name',
			rules: ['isRequired'],
			msg: '昵称不能为空！'
		}, {
			name: 'email',
			rules: ['isEmail'],
			msg: '邮箱格式不正确！'
		}, {
			name: 'content',
			rules: ['isRequired'],
			msg: '内容不能为空！'
		}]);

		if(data) {
			fetch('/api/comment', {
			  method: 'POST',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			  body: JSON.stringify(_.extend(data, {article: article}))
			}).then(function(response) {
				return response.json();
			}).then(function(json) {
				this.setState({
					validateMsg: json.msg
				});
			}.bind(this));
		}
	},

	render: function() {
		var article = this.state.model,
				tags = this.state.tags,
				links = this.state.links,
				typePath = article._type && article._type.path;

		return (
			<div className="container article">
				<div className="row">
					<div className="col-sm-9">
						<article>
							<header className="info">
								<h2>{article.title}</h2>
								<i className="glyphicon glyphicon-user"></i>
								<span>{article.author}</span>
								<i className="glyphicon glyphicon-time"></i>
								<span>{moment(article.updatedAt).format('YYYY-MM-DD')}</span>
								<i className="glyphicon glyphicon-eye-open"></i>
								<span>{article.visits}</span>
								<i className="glyphicon glyphicon-comment"></i>
								<span>{0}</span>
							</header>
							<section dangerouslySetInnerHTML={{__html: article.introduction}}></section>
							<footer>
								<span>
									<i className="glyphicon glyphicon-tag"></i>
									{article.tags && article.tags.map(function(tag, index) {
										return (
											<Link key={index} to="/" query={{tagPath: tag.path}}> {tag.name}</Link>
										);
									})}
								</span>
							</footer>
						</article>
						<section>
							<div>
								<h3>留言列表</h3>
								<ul>
									<li>
										<div className="info">
											<img src="http://mhbseal.com/upload/img/user.jpg" />
											<strong>user name</strong>
											<span>time...</span>
										</div>
										<div className="content">content..</div>
										<a href="#">reply</a>
									</li>
								</ul>
							</div>
							<table>
								<caption>发表评论</caption>
								<tbody>
									<tr>
										<td>昵称：</td>
										<td><input type="text" ref="name" className="form-control" /></td>
									</tr>
									<tr>
										<td>邮箱：</td>
										<td><input type="email" ref="email" className="form-control" /></td>
									</tr>
									<tr>
										<td>内容：</td>
										<td><textarea ref="content" className="form-control"></textarea></td>
									</tr>
									<tr>
										<td></td>
										<td>
											<a href="javascript:void(0);" className="btn btn-default" onClick={this.handleComment.bind(this, {id: article._id, typePath: typePath})}>发表评论</a>
											<span className="validateMsg">{this.state.validateMsg}</span>
										</td>
									</tr>
								</tbody>
							</table>
						</section>
					</div>
					<Sidebar tags={tags} links={links} history={this.props.history} />
				</div>
			</div>
		);
	}
});

module.exports = Article;
