var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var NavWrapper = require('./components/headerAndFooter/navWrapper');
var ProjectMain = require('./components/projectMain/projectMain');
var DiscoverPage = require('./components/discover/discoverPage');

var Routes = (
  <Router history={hashHistory}>
		<Route path="/" component={NavWrapper}>
			<Route path="discover" component={DiscoverPage} />
			<Route path="discover/categories/:categoryName"
				component={DiscoverPage} />
			<Route path="discover/categories/:categoryName/:subcategoryName"
				component={DiscoverPage} />
			<Route path="projects/:projectId" component={ProjectMain} />
		</Route>
  </Router>
);

launchPage = function () {
  ReactDOM.render(
    Routes,
		$("div#content")[0]
	);
};
