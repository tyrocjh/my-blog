var React = require('react');

var PageList = React.createClass({
	componentDidMount: function() {
		console.info(this.props);
	},

	render: function() {
		return (
			<div className="page-list">
				<span>fenye...</span>
			</div>
		)
	}
});

module.exports = PageList;
