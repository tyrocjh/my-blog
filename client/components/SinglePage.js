var React = require('react'),
		Sidebar = require('./Sidebar');

var SinglePage = React.createClass({
	getInitialState: function() {
		return {
			url: 'api/single_page',
			model: {},
			tags: [],
			links: []
		}
	},

	componentDidMount: function() {
		this.fetchArticle();
	},

	componentDidUpdate: function() {
		this.fetchArticle();
	},

	fetchArticle: function() {
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
				model: json.data.model,
				tags: json.data.tags,
				links: json.data.links,
			});
		}.bind(this)).catch(function(ex) {
			console.log('parsing failed', ex);
		});
	},

	render: function() {
		var model = this.state.model, 
				tags = this.state.tags,
				links = this.state.links;

		return (
			<div className="container single-page">
				<div className="row">
					<div className="col-sm-9">
						<h2>{model.title}</h2>
						<article dangerouslySetInnerHTML={{__html: model.content}}></article>
					</div>
					<Sidebar tags={tags} links={links} history={this.props.history} />
				</div>
			</div>
		);
	}
});

module.exports = SinglePage;
