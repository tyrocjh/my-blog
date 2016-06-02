var React = require('react'),
		ReactRouter = require('react-router'),
		Link = ReactRouter.Link;

var PageList = React.createClass({
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
				pageListComponent.push(<span key="page-start" className="page-start">«</span>);
				pageListComponent.push(<span key="page-pre" className="page-pre">‹</span>);
			} else {
				pageListComponent.push(<Link key="page-start" className="page-start" to={path} query={{page: 1}}>«</Link>);
				pageListComponent.push(<Link key="page-pre" className="page-pre" to={path} query={{page: currentPage - 1}}>‹</Link>);
			}

			while(preCount < currentPage) {
				pageListComponent.push(<Link key={preCount} to={path} query={{page: preCount}}>{preCount}</Link>);
				preCount++;
			}

			pageListComponent.push(<span key={currentPage} className="page-current">{currentPage}</span>);

			while(nextCount <= maxCount) {
				pageListComponent.push(<Link key={nextCount} to={path} query={{page: nextCount}}>{nextCount}</Link>);
				nextCount++;
			}

			if(currentPage === pageCount) {
				pageListComponent.push(<span key="page-next" className="page-next">›</span>);
				pageListComponent.push(<span key="page-end" className="page-end">»</span>);
			} else {
				pageListComponent.push(<Link key="page-next" className="page-next" to={path} query={{page: 1}}>›</Link>);
				pageListComponent.push(<Link key="page-end" className="page-end" to={path} query={{page: currentPage - 1}}>»</Link>);
			}

			pageListComponent.push(<span key="total" className="page-total">{rowCount}条/共{pageCount}页</span>);

		} else {
			pageListComponent.push(<span key="none">暂无记录</span>);
		}

		return (
			<div className="page-list">
				{pageListComponent}
			</div>
		);
	}
});

module.exports = PageList;
