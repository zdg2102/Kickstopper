var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var projectConstants = require('../constants/projectConstants');

var ProjectStore = new Store(AppDispatcher);

var _projects = [];

var _keyedProjects = {};

var refreshProjects = function (projects) {
	_projects = [];
	_keyedProjects = {};
	for (var i = 0; i < projects.length; i++) {
		_projects.push(projects[i]);
		_keyedProjects[projects[i].id] = projects[i];
	}
};

var appendProjects = function (projects) {
  for (var i = 0; i < projects.length; i++) {
    _projects.push(projects[i]);
    _keyedProjects[projects[i].id] = projects[i];
  }
};

var updateProject = function (project) {
  for (var i = 0; i < _projects.length; i++) {
    if (_projects[i].id === project.id) {
      _projects.splice(i, 1);
      break;
    }
  }
  _projects.push(project);
  _keyedProjects[project.id] = project;
};

ProjectStore.all = function () {
	return _projects.slice();
};

ProjectStore.find = function (projectId) {
  return _keyedProjects[projectId];
};

ProjectStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
		case projectConstants.ALL_PROJECTS_RECEIVED:
		  refreshProjects(payload.projects);
			ProjectStore.__emitChange();
			break;
		case projectConstants.SINGLE_PROJECT_RECEIVED:
		  updateProject(payload.project);
			ProjectStore.__emitChange();
			break;
    case projectConstants.NEW_PAGE_PROJECTS_RECEIVED:
      appendProjects(payload.projects);
      ProjectStore.__emitChange();
      break;
	}
};

module.exports = ProjectStore;
