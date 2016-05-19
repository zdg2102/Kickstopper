var sessionConstants = require('../constants/sessionConstants');
var AppDispatcher = require('../dispatcher/dispatcher');

var SessionActions = {
  receiveCurrentUser: function (currentUser) {
    var action = {
      actionType: sessionConstants.CURRENT_USER_RECEIVED,
      currentUser: currentUser
    };
    AppDispatcher.dispatch(action);
  },

  logout: function () {
    var action = {
      actionType: sessionConstants.LOGOUT
    };
    AppDispatcher.dispatch(action);
  }
};

module.exports = SessionActions;
