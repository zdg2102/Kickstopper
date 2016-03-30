// list for all projects matching the current filter

var React = require('react');
var ProjectTile = require('../projectPanels/projectTile');

var DiscoverMainList = React.createClass({

  render: function () {

		var tiles = this.props.projects.map(function (project) {
			return <ProjectTile key={project.id} project={project} />;
		});

    return (
			<section className="main-discover-list group">

				<span className="discover-list-header">
					{"Explore live projects"}
				</span>

				{tiles}

				<button className="expand-list-button"
					onClick={this.props.loadMain}>
					{"Load more"}
				</button>

			</section>

		);

	}

});

module.exports = DiscoverMainList;
