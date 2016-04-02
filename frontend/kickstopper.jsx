var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;
var SessionStore = require('./stores/sessionStore');
var NavWrapper = require('./components/headerAndFooter/navWrapper');
var ProjectMain = require('./components/projectMain/projectMain');
var DiscoverPage = require('./components/discover/discoverPage');
var SessionForm = require('./components/sessionForms/sessionForm');
var Login = require('./components/sessionForms/login');
var SignUp = require('./components/sessionForms/signUp');

// FINDTAG push nav to /nav, set global level app wrapper component that
// does nothing but keep track of if somebody is logged in or not

var App = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
  		<Route path="/nav" component={NavWrapper}>
  			<Route path="session" component={SessionForm}>
  				<Route path="/login" component={Login}
            onEnter={_requireLoggedOut} />
  				<Route path="/signup" component={SignUp}
            onEnter={_requireLoggedOut} />
  			</Route>
  			<Route path="/discover" component={DiscoverPage} />
  			<Route path="/discover/categories/:categoryName"
  				component={DiscoverPage} />
        <Route path="/discover/categories/:categoryName/:subcategoryName"
  				component={DiscoverPage} />
        <Route path="/projects/:projectId" component={ProjectMain} />
  		</Route>
    </Route>
  </Router>
);

window.launchPage = function () {
  ReactDOM.render(
    Routes,
		$("div#content")[0]
	);
};

// function _requireLoggedIn(nextState, replace, asyncCompletionCallback) {
//   if (!SessionStore.currentUserHasBeenFetched()) {
//     ApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
//   } else {
//     _redirectIfNotLoggedIn();
//   }
//
//   function _redirectIfNotLoggedIn() {
//     if (!SessionStore.isLoggedIn()) {
//       replace("/login");
//     }
//
//     asyncCompletionCallback();
//   }
// }

function _requireLoggedOut(nextState, replace, callback) {
  // var _redirectIfLoggedIn = function () {
  //   if (!SessionStore.isLoggedIn()) {
  //     replace("/");
  //   }
  //   callback();
  // };
  //
  // if (!SessionStore.currentUserHasBeenFetched()) {
  //   ApiUtil.fetchCurrentUser(_redirectIfLoggedIn);
  // } else {
  //   _redirectIfLoggedIn();
  // }
  callback();
}
