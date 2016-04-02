var ProjectActions = require('../actions/projectActions');
var SessionActions = require('../actions/sessionActions');

var ApiUtil = {
  getProjectMain: function (projectId) {
		$.ajax({
			type: 'GET',
			url: '/api/projects/' + projectId,
			dataType: 'json',
			data: 'detailType=main',
			success: function (project) {
        ProjectActions.receiveSingleProject(project);
			}
		});
	},

	getFilteredProjects: function (params) {
		$.ajax({
			type: 'GET',
			url: '/api/projects/',
			dataType: 'json',
			data: {projects: params},
			success: function (projects) {
				ProjectActions.receiveAllProjects(projects);
			}
		});
	},

	getNextPageProjects: function (params) {
		$.ajax({
			type: 'GET',
			url: '/api/projects/',
			dataType: 'json',
			data: {projects: params},
			success: function (projects) {
				ProjectActions.receiveNewPageProjects(projects);
			}
		});
	},

  globalSearch: function (term) {
    $.ajax({
      type: 'GET',
      url: '/api/searches/search',
      dataType: 'json',
      data: {term: term},
      success: function (projects) {
        console.log("Searched!");
        // SearchActions.receiveSearchResults(projects);
      }
    });
  },

  login: function (credentials, successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: {user: credentials},
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        if (successCallback) { successCallback(); }
      },
      error: function () {
        if (errorCallback) { errorCallback(); }
      }
    });
  },

  logout: function () {
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      dataType: "json",
      success: function () {
        SessionActions.logout();
      }
    });
  },

  getCurrentUser: function (completion) {
    $.ajax({
      type: 'GET',
      url: '/api/session/current',
      dataType: 'json',
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
      },
      complete: function () {
        if (completion) { completion(); }
      }
    });
  }
};

module.exports = ApiUtil;
