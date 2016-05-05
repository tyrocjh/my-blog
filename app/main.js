var React = require('react'),
		ReactDOM = require('react-dom'),
		ReactRouter = require('react-router'),
		createBrowserHistory = require('history/lib/createBrowserHistory'),
		routes = require('./routes');

var Router = ReactRouter.Router;
var history = createBrowserHistory();
ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('app'));
