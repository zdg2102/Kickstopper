var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var projectConstants = require('../constants/projectConstants');

var ProjectStore = new Store(AppDispatcher);

var _projects = {};

ProjectStore.find = function (projectId) {
  return _projects[projectId];
};

ProjectStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
		case projectConstants.SINGLE_PROJECT_RECEIVED:
		  _projects[payload.project.id] = payload.project;
			ProjectStore.__emitChange();
			break;
	}
};

module.exports = ProjectStore;
