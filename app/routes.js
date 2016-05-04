var Router = require('react-router');
var Layout = require('./components/Layout');
var ArticleList = require('./components/ArticleList');

export default (
  <Router>
    <Route path="/" component={Layout}>
      <IndexRoute component={ArticleList} />
    </Route>
  </Router>
);
