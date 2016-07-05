var React = require('react'),
		ReactRouter = require('react-router'),
		Link = ReactRouter.Link,
		PageList = require('./PageList'),
		Sidebar = require('./Sidebar'),
		moment = require('moment');

var ArticleList = React.createClass({
	componentDidMount: function() {
		this.listFetch();
	},

	componentWillReceiveProps: function() {
		this.listFetch();
	},

	getInitialState: function() {
		return {
			url: 'api/article',
			dataList: [],
			pageList: {},
			tags: [],
			links: []
		}
	},

	listFetch: function() {
		fetch(this.state.url + location.search, {
		  method: 'GET',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  }
		}).then(function(response) {
			return response.json();
		}).then(function(json) {
			this.setState({
				dataList: json.data.dataList,
				pageList: json.data.pageList,
				tags: json.data.tags,
				links: json.data.links
			});
		}.bind(this)).catch(function(ex) {
			console.log('parsing failed', ex);
		});
	},

	render: function() {
		var rowCount = this.state.pageList.rowCount,
				currentPage = this.state.pageList.currentPage,
				pageCount = this.state.pageList.pageCount,
				pageRange = this.state.pageList.pageRange,
				pageSize = this.state.pageList.pageSize,
				queryParams = this.state.pageList.query || {},
				tags = this.state.tags,
				links = this.state.links;

		var articleList = this.state.dataList.map(function(article, index) {
			var num = (currentPage - 1) * pageSize + index + 1;
			return (
				<article key={num}>
					<header>
						<span className="glyphicon glyphicon-pencil"></span>
						<h2><a href="#">{article.title}</a></h2>
						<div className="info">
							<i className="glyphicon glyphicon-user"></i>
							<span>{article.author}</span>
							<i className="glyphicon glyphicon-time"></i>
							<span>{moment(article.updatedAt).format('YYYY-MM-DD')}</span>
							<i className="glyphicon glyphicon-eye-open"></i>
							<span>{article.visits}</span>
							<i className="glyphicon glyphicon-comment"></i>
							<span>{0}</span>
						</div>
					</header>
					<section dangerouslySetInnerHTML={{__html: article.introduction}}></section>
					<footer>
						<span>
							<i className="glyphicon glyphicon-tag"></i>
							{article.tags.map(function(tag, index) {
								return (
									<Link key={index} to="/" query={{tagPath: tag.path}}> {tag.name}</Link>
								);
							})}
							<a href="#" className="more-link"><i className="glyphicon glyphicon-share-alt"></i><span> more</span></a>
						</span>
					</footer>
				</article>
			)
		}.bind(this));

		return (
			<div className="container article-list">
				<div className="row">
					<div className="col-sm-9">
						{articleList}
						<PageList rowCount={rowCount} currentPage={currentPage} pageCount={pageCount} pageRange={pageRange} queryParams={queryParams} path={'/'} />
					</div>
					<Sidebar tags={tags} links={links} history={this.props.history} />
				</div>
			</div>
		);
	}
});

module.exports = ArticleList;
