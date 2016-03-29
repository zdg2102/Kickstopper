var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var NavWrapper = require('./components/headerAndFooter/navWrapper');

var testProj = {
  title: "Test Project Title",
	creatorName: "Joe Smith",
	numBackers: 276,
	goal: 10000,
	pledged: 11909,
	daysLeft: 24
};

var ProjectMain = require('./components/projectMain/projectMain');

var testDiv = React.createClass({
  render: function () {
    return <ProjectMain project={testProj} />;
	}
});

var Routes = (
  <Router history={hashHistory}>
		<Route path="/" component={NavWrapper}>
      <IndexRoute component={testDiv} />
		</Route>
  </Router>
);

launchPage = function () {
  ReactDOM.render(
    Routes,
		$("div#content")[0]
	);
};
