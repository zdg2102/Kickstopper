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

	getAllProjects: function () {
    $.ajax({
			type: 'GET',
			url: '/api/projects/',
			dataType: 'json',
			success: function (projects) {
        ProjectActions.receiveAllProjects(projects);
			}
		});
	}
};

module.exports = ApiUtil;
