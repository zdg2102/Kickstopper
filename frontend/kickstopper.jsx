var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

// temp
var IndexRedirect = require('react-router').IndexRedirect;

var browserHistory = require('react-router').browserHistory;
var SessionStore = require('./stores/sessionStore');
var CheckoutStore = require('./stores/checkoutStore');
var UnlaunchedProjectStore = require('./stores/unlaunchedProjectStore');
var ApiUtil = require('./utils/apiUtil');
var App = require('./components/app/app');
var NavWrapper = require('./components/headerAndFooter/navWrapper');
var StaticWrapper = require('./components/headerAndFooter/staticWrapper');
var MainPage = require('./components/main/mainPage');
var ProjectMain = require('./components/projectMain/projectMain');
var DiscoverPage = require('./components/discover/discoverPage');
var PledgePage = require('./components/pledges/pledgePage');
var CheckoutPage = require('./components/checkouts/checkoutPage');
var ThankYouPage = require('./components/pledges/thankYouPage');
var AboutPage = require('./components/about/aboutPage');
var StartProjectPage = require('./components/startProject/startProjectPage');
var EditProjectPage = require('./components/editProject/editProjectPage');
var SessionForm = require('./components/sessionForms/sessionForm');
var Login = require('./components/sessionForms/login');
var SignUp = require('./components/sessionForms/signUp');

// <IndexRoute component={MainPage} />
// FINDTAG have to remove projects when they run out of days

var Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route component={NavWrapper}>
        <IndexRedirect to="discover" />
        <Route component={SessionForm} onEnter={_requireLoggedOut}>
          <Route path="login" component={Login}
            onEnter={_requireLoggedOut} />
          <Route path="signup" component={SignUp}
            onEnter={_requireLoggedOut} />
        </Route>
        <Route path="about" component={AboutPage} />
        <Route path="discover" component={DiscoverPage} />
        <Route path="discover/categories/:categoryName"
          component={DiscoverPage} />
        <Route path="discover/categories/:categoryName/:subcategoryName"
          component={DiscoverPage} />
        <Route path="projects/:projectId" component={ProjectMain} />
      </Route>
      <Route component={StaticWrapper} onEnter={_requireLoggedIn}>
        <Route path="projects/:projectId/pledges/new"
          component={PledgePage}/>
          <Route path="start" component={StartProjectPage} />
        <Route path="unlaunched/:unlaunchedProjectId/edit"
          component={EditProjectPage} onEnter={_requireCreator} />
        <Route path="checkouts/:checkoutId" component={CheckoutPage}
          onEnter={_requireOwner} />
        <Route path="checkouts/:checkoutId/completed"
          component={ThankYouPage} onEnter={_requireOwner} />
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

function _requireLoggedIn(nextState, replace, callback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.getCurrentUser(_redirectIfNotLoggedIn);
  } else {
    _redirectIfNotLoggedIn();
  }

  function _redirectIfNotLoggedIn() {
    if (!SessionStore.isLoggedIn()) {
      // to ensure continuity with previous request after redirect,
      // add next path and query to redirect query
      var params = $.extend({ continueTo: nextState.location.pathname },
        nextState.location.query);
      replace({ pathname: "/login",
        query: params });
    }
    callback();
  }
}

function _requireLoggedOut(nextState, replace, callback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.getCurrentUser(_redirectIfNotLoggedOut);
  } else {
    _redirectIfNotLoggedOut();
  }

  function _redirectIfNotLoggedOut() {
    if (SessionStore.isLoggedIn()) {
      replace("/");
    }
    callback();
  }
}

function _requireOwner(nextState, replace, callback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.getCurrentUser(_redirectIfNotOwner);
  } else {
    _redirectIfNotOwner();
  }

  function _redirectIfNotOwner() {
    if (!CheckoutStore.currentCheckout()) {
      ApiUtil.getCheckout(nextState.params.checkoutId, function () {
        callback();
      }, function () {
        replace("/");
        callback();
      });
    } else if (CheckoutStore.currentCheckout().user_id !==
         SessionStore.currentUser().id) {
      replace("/");
    }
    callback();
  }
}

function _requireCreator(nextState, replace, callback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.getCurrentUser(_redirectIfNotCreator);
  } else {
    _redirectIfNotCreator();
  }

  function _redirectIfNotCreator() {
    if (!UnlaunchedProjectStore.currentProject()) {
      ApiUtil.getUnlaunchedProject(nextState.params
        .unlaunchedProjectId, function () {
        callback();
      }, function () {
        replace("/");
        callback();
      });
    } else if (UnlaunchedProjecStore.currentProject().user_id !==
         SessionStore.currentUser().id) {
      replace("/");
    }
    callback();
  }
}
