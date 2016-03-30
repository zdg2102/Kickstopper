var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var projectConstants = require('../constants/projectConstants');

var ProjectStore = new Store(AppDispatcher);

var _projects = {};

var refreshProjects = function (projects) {
	_projects = {};
  for (var i = 0; i < projects.length; i++) {
    _projects[projects[i].id] = projects[i];
	}
};

ProjectStore.find = function (projectId) {
  return _projects[projectId];
};

ProjectStore.all = function () {
  var all = [];
	for (var id in _projects) {
		if (_projects.hasOwnProperty(id)) {
			all.push(_projects[id]);
		}
	}
	return all;
};

ProjectStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
		case projectConstants.ALL_PROJECTS_RECEIVED:
		  refreshProjects(payload.projects);
			ProjectStore.__emitChange();
			break;
		case projectConstants.SINGLE_PROJECT_RECEIVED:
		  _projects[payload.project.id] = payload.project;
			ProjectStore.__emitChange();
			break;
	}
};

module.exports = ProjectStore;
