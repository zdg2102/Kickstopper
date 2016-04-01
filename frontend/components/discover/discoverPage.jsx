// main class for discover/search page

var React = require('react');
var ProjectStore = require('../../stores/projectStore');
var ApiUtil = require('../../utils/apiUtil');
var ProjectTile = require('../projectPanels/projectTile');
var DiscoverMainList = require('./discoverMainList');
var FilterBox = require('./filterBox');

var DiscoverPage = React.createClass({

  // FINDTAG add message if projects list returns with length 0

	getInitialState: function () {
    return {projects: ProjectStore.all()};
	},

	componentDidMount: function () {
    this.projectStoreToken = ProjectStore.addListener(this.refresh);
		var params = $.extend({}, this.props.location.query, this.props.params);
		ApiUtil.getFilteredProjects(params);
	},

	componentWillReceiveProps: function (newProps) {
		var params = $.extend({}, newProps.location.query, newProps.params);
    ApiUtil.getFilteredProjects(params);
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

				<FilterBox />

        <div className="discover-lists-container">

					<DiscoverMainList projects={this.state.projects} />

					<button className="expand-list-button"
						onClick={this.loadMain}>
						{"Load more"}
					</button>

        </div>

			</div>
		);
	}

});

module.exports = DiscoverPage;
