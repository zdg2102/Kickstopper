var projectConstants = require('../constants/projectConstants');
var AppDispatcher = require('../dispatcher/dispatcher');

var ProjectActions = {
  receiveSingleProject: function (project) {
		var action = {
			actionType: projectConstants.SINGLE_PROJECT_RECEIVED,
			project: project
		};
		AppDispatcher.dispatch(action);
	}
};

module.exports = ProjectActions;
