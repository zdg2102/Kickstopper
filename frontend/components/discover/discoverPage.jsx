// main class for discover/search page

var React = require('react');
var ProjectStore = require('../../stores/projectStore');
var ApiUtil = require('../../utils/apiUtil');
var ProjectTile = require('../projectPanels/projectTile');

var DiscoverPage = React.createClass({
	getInitialState: function () {
    return {projects: ProjectStore.all()};
	},

	componentDidMount: function () {
    this.projectStoreToken = ProjectStore.addListener(this.refresh);
		ApiUtil.getAllProjects();
	},

	componentWillUnmount: function () {
    this.projectStoreToken.remove();
	},

	refresh: function () {
    this.setState({projects: ProjectStore.all()});
	},

  render: function () {

    var tiles = this.state.projects.map(function (project) {
      return <ProjectTile key={project.id} project={project} />;
		});

    return (
			<div>
				{tiles}
			</div>
		);
	}

});

module.exports = DiscoverPage;
