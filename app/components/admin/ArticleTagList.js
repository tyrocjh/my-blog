var React = require('react'),
		FormValidation = require('../utils/formValidation'),
		AdminPath = require('../../config').adminPath;

var ArticleTagList = React.createClass({
	render: function() {
		return (
			<a href={AdminPath + "/articleTag"} className="btn btn-default">新增</a>
		);
	}
});

module.exports = ArticleTagList;
