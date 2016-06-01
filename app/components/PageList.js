var React = require('react'),
		ReactRouter = require('react-router'),
		Link = ReactRouter.Link;

var PageList = React.createClass({
	componentDidMount: function() {
		console.info(this.props);
	},

	render: function() {
		var pageListComponent = [],
				path = this.props.path,
				rowCount = this.props.rowCount,
				currentPage = this.props.currentPage,
				pageCount = this.props.pageCount,
				pageRange = this.props.pageRange,
				preCount = (currentPage - pageRange > 0) ? (currentPage - pageRange) : 1;
				nextCount = currentPage + 1,
				maxCount = (currentPage + pageRange > pageCount) ? pageCount : currentPage + pageRange;

		if(rowCount > 0) {

			if(currentPage === 1) {
				pageListComponent.push(<span className="page-start">«</span>);
				pageListComponent.push(<span className="page-pre">‹</span>);
			} else {
				pageListComponent.push(<Link className="page-start" to={path} query={1}>«</Link>);
				pageListComponent.push(<Link className="page-pre" to={path} query={currentPage - 1}>‹</Link>);
			}

			while(preCount < currentPage) {
				pageListComponent.push(<Link to={path} query={preCount}>{preCount}</Link>);
				preCount++;
			}

			pageListComponent.push(<span className="page-current">{currentPage}</span>);

			while(nextCount <= maxCount) {
				pageListComponent.push(<Link to={path} query={nextCount}>{nextCount}</Link>);
				nextCount++;
			}

			if(currentPage === pageCount) {
				pageListComponent.push(<span className="page-next">›</span>);
				pageListComponent.push(<span className="page-end">»</span>);
			} else {
				pageListComponent.push(<Link className="page-next" to={path} query={1}>›</Link>);
				pageListComponent.push(<Link className="page-end" to={path} query={currentPage - 1}>»</Link>);
			}

			pageListComponent.push(<span className="page-total">{rowCount}条/共{pageCount}页</span>);

		} else {
			pageListComponent.push(<span>暂无记录</span>);
		}

		return (
			<div className="page-list">
				{pageListComponent}
			</div>
		);
	}
});

module.exports = PageList;
