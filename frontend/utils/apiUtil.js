var ProjectActions = require('../actions/projectActions');

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
			url: 'api/projects/',
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
			url: 'api/projects/',
			dataType: 'json',
			data: {projects: params},
			success: function (projects) {
				ProjectActions.receiveNewPageProjects(projects);
			}
		});
	}

	// getAllProjects: function () {
  //   $.ajax({
	// 		type: 'GET',
	// 		url: '/api/projects/',
	// 		dataType: 'json',
	// 		success: function (projects) {
  //       ProjectActions.receiveAllProjects(projects);
	// 		}
	// 	});
	// },
	//
	// getCategoryProjects: function (params) {
	// 	$.ajax({
	// 		type: 'GET',
	// 		url: 'api/projects/',
	// 		dataType: 'json',
	// 		data: {projects: params},
	// 		success: function (projects) {
	// 			ProjectActions.receiveAllProjects(projects);
	// 		}
	// 	});
	// }
};

module.exports = ApiUtil;
