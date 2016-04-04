// list for all projects matching the current filter

var React = require('react');
var ProjectTile = require('../projectPanels/projectTile');

var DiscoverMainList = React.createClass({

  render: function () {

		var tiles = this.props.projects.map(function (project) {
			return <ProjectTile key={project.id} project={project}
        modalOn={this.props.modalOn} />;
    }.bind(this));

    return (
			<section className="main-discover-list group">

				<span className="discover-list-header">
					{"Explore live projects"}
				</span>

				{tiles}

			</section>

		);

	}

});

module.exports = DiscoverMainList;
