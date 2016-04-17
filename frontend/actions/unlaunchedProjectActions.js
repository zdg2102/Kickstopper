var unlaunchedProjectConstants =
  require('../constants/unlaunchedProjectConstants');
var AppDispatcher = require('../dispatcher/dispatcher');

var UnlaunchedProjectActions = {
  receiveUnlaunchedProject: function (project) {
		var action = {
			actionType: unlaunchedProjectConstants.UNLAUNCHED_PROJECT_RECEIVED,
			project: project
		};
		AppDispatcher.dispatch(action);
	}
};

module.exports = UnlaunchedProjectActions;
