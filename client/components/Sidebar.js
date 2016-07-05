var React = require('react'),
		_ = require('lodash');

var Sidebar = React.createClass({
	componentDidUpdate: function() {
		var colors = this.refs.colors.childNodes,
				tagColors = ['F99', 'C9C', 'F96', '6CC', '6C9', '37A7FF', 'B0D686', 'E6CC6E', 'EF8203', 'FF5E52'];

		for(var i=0; i<colors.length; i++) {
			if(colors[i].tagName === 'A') {
				colors[i].style.background = '#' + _.sample(tagColors);
			}
		}
	},

	handleSearch: function() {
		var search = this.refs.search;
		var value = search.value.trim();
		
		if(value.length === 0) {
			alert('搜索内容不能为空！');
			return;
		}

		this.props.history.pushState(null, '/', {keyword: value})
		search.value = '';
	},

	render: function() {
		return (
			<aside className="col-sm-3 sidebar">
				<section>
					<h3>搜索</h3>
					<div id="search">
						<input type="text" className="form-control" placeholder="关键字" ref="search" />
						<a href="javascript:void(0);" onClick={this.handleSearch} className="btn btn-default">GO</a>
					</div>
				</section>
				<section ref="colors" className="clearfix">
					<h3>标签云</h3>
					{this.props.tags && this.props.tags.map(function(tag, index) {
						return (
							<Link key={index} to="/" query={{tagPath: tag.path}} className="label">{tag.name}</Link>
						);
					})}
				</section>
				<section>
					<h3>友情链接</h3>
					<ul className="list-unstyled link">
						{this.props.links && this.props.links.map(function(link, index) {
							return (
								<li key={index}><a href={link.url} title={link.name} target="_blank">{link.name}</a></li>
							);
						})}
					</ul>
				</section>
			</aside>
		);
	}
});

module.exports = Sidebar;
