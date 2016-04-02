var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var projectConstants = require('../constants/projectConstants');

var SessionStore = new Store(AppDispatcher);

// var _projects = [];
//
// var _keyedProjects = {};
//
// var refreshProjects = function (projects) {
// 	_projects = [];
// 	_keyedProjects = {};
// 	for (var i = 0; i < projects.length; i++) {
// 		_projects.push(projects[i]);
// 		_keyedProjects[projects[i].id] = projects[i];
// 	}
// };
//
// SessionStore.all = function () {
// 	return _projects.slice();
// };
//
// SessionStore.find = function (projectId) {
//   return _projects[projectId];
// };

SessionStore.__onDispatch = function (payload) {
  // switch (payload.actionType) {
	// 	case projectConstants.ALL_PROJECTS_RECEIVED:
	// 	  refreshProjects(payload.projects);
	// 		SessionStore.__emitChange();
	// 		break;
	// 	case projectConstants.SINGLE_PROJECT_RECEIVED:
	// 	  _projects[payload.project.id] = payload.project;
	// 		SessionStore.__emitChange();
	// 		break;
	// }
};

module.exports = SessionStore;
