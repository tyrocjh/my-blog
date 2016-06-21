var ListFetchMixin = {
	componentDidMount: function() {
		this.listFetch();
	},

	componentWillReceiveProps: function() {
		this.listFetch();
	},

	listFetch: function() {
		fetch(this.state.url + location.search, {
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
				dataList: json.data.dataList,
				pageList: json.data.pageList
			});
		}.bind(this)).catch(function(ex) {
			console.log('parsing failed', ex);
		});
	}
};

module.exports = ListFetchMixin;
