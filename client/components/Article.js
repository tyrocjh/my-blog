var React = require('react'),
		Sidebar = require('./Sidebar'),
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

	render: function() {
		var article = this.state.model,
				tags = this.state.tags,
				links = this.state.links;

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
										<a href="javascript:void(0);" className="btn">发表评论</a>
									</td>
								</tr>
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
