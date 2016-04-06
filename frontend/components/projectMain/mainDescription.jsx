// left-hand detail panel for providing project description

var React = require('react');

var MainDescription = React.createClass({

	// FINDTAG need to edit this to allow users to write
	// their descriptions in Markdown
	// (or rich text editor library)

  render: function () {

		var description = this.props.project ?
		  this.props.project.project_description : "";
    var imageUrl = this.props.project ? this.props.project.main_image_url : "";

    return (
      <div className="project-description">

				<h4 className="project-detail-header">
					{"About this project"}
				</h4>

        <div className="project-description-picture-container">
          <img className="project-description-picture"
            src={imageUrl} />
        </div>

			  <p className="project-description-body">
					{description}
			  </p>

      </div>
		);

	}

});

module.exports = MainDescription;
