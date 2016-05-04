var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var createBrowserHistory = require('history/lib/createBrowserHistory');
var routes = require('./routes');

var history = createBrowserHistory();
ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('app'));
