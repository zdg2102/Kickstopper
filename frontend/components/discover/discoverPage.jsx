// main class for discover/search page

var React = require('react');
var ProjectStore = require('../../stores/projectStore');
var ApiUtil = require('../../utils/apiUtil');
var ProjectTile = require('../projectPanels/projectTile');
var DiscoverMainList = require('./discoverMainList');

var DiscoverPage = React.createClass({
	getInitialState: function () {
    return {projects: ProjectStore.all()};
	},

	componentDidMount: function () {
	  var queryVals = this.props.location.query;

    this.projectStoreToken = ProjectStore.addListener(this.refresh);
		ApiUtil.getAllProjects();
	},

	componentWillUnmount: function () {
    this.projectStoreToken.remove();
	},

	refresh: function () {
    this.setState({projects: ProjectStore.all()});
	},

	loadMain: function () {

	},

  render: function () {

    return (
			<div>

        <div className="discover-lists-container">

					<DiscoverMainList projects={this.state.projects}
						loadMain={this.loadMain} />

        </div>

			</div>
		);
	}

});

module.exports = DiscoverPage;
