var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var sessionConstants = require('../constants/sessionConstants');

var SessionStore = new Store(AppDispatcher);

var _currentUser = null;
var _currentUserHasBeenFetched = false;

SessionStore.currentUser = function () {
  return _currentUser;
};

SessionStore.isLoggedIn = function () {
  return !!_currentUser;
};

SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
		case sessionConstants.CURRENT_USER_RECEIVED:
		  _currentUser = payload.currentUser;
      _currentUserHasBeenFetched = true;
			SessionStore.__emitChange();
			break;
    case sessionConstants.LOGOUT:
      _currentUser = null;

      // test line, may cause errors
      _currentUserHasBeenFetched = false;

      SessionStore.__emitChange();
      break;
	}
};

module.exports = SessionStore;
