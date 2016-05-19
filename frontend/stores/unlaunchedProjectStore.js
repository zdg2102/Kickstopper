var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var unlaunchedProjectConstants =
  require('../constants/unlaunchedProjectConstants');

var UnlaunchedProjectStore = new Store(AppDispatcher);

var _currentProject = null;

UnlaunchedProjectStore.currentProject = function () {
  var projectCopy = {};
  if (_currentProject) {
    for (var id in _currentProject) {
      if (_currentProject.hasOwnProperty(id)) {
        projectCopy[id] = _currentProject[id];
      }
    }
  } else {
    projectCopy = null;
  }
  return projectCopy;
};

UnlaunchedProjectStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case unlaunchedProjectConstants.UNLAUNCHED_PROJECT_RECEIVED:
      _currentProject = payload.project;
      UnlaunchedProjectStore.__emitChange();
      break;
  }
};

module.exports = UnlaunchedProjectStore;
