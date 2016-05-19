// small tile summarizing project data, for use in lists

var React = require('react');

var ProjectTile = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleClick: function () {
    // close the search box if that's how we got here
    if (this.props.closeSearch) {
      this.props.closeSearch();
    }
    this.context.router.push("/projects/" + this.props.project.id);
  },

  render: function () {
    var title, creatorName, amountPledged, blurb, percentComplete,
      fundingGoal, fundingDate, daysLeft, blurbStyle, progressModal;
    if (this.props.project) {
      title = this.props.project.title;
      creatorName = this.props.project.creator_name;
      amountPledged = this.props.project.amount_pledged;
      formattedAmountPledged = this.props.project
        .formatted_amount_pledged;
      fundingGoal = this.props.project.funding_goal;
      fundingDate = this.props.project.funding_date;
      blurb = this.props.project.project_blurb;
      imageUrl = this.props.project.main_image_url;
    }
    if (amountPledged && fundingGoal) {
      percentComplete = parseInt((amountPledged / fundingGoal) * 100,
        10) + "%";
    } else {
      percentComplete = "0%";
    }
    if (fundingDate) {
      // convert milliseconds to days
      var fundDateObj = new Date(fundingDate);
      daysLeft = Math.ceil((fundDateObj - Date.now()) / 86400000);
    }

    if (this.props.modalOn) {
      blurbStyle = " with-modal";
      progressModal = " with-modal";
    } else {
      blurbStyle = " white-gradient";
      progressModal = "";
    }

    return (

      <div className="project-tile" onClick={this.handleClick}>

        <div className="tile-image-container">
          <img className="tile-image" src={imageUrl} />
        </div>

        <div className="tile-content">
          <h6 className="tile-title">{title}</h6>
          <p className="tile-byline">{creatorName}</p>
          <p className={"tile-blurb" + blurbStyle}>{blurb}</p>
        </div>

        <div className="tile-footer">

          <div className={"tile-progress-bar" + progressModal}>
            <div className={"tile-progress-complete" + progressModal}
              style={{width: percentComplete}}>
            </div>

          </div>

          <ul className="tile-stats group">
            <li>
              <data className="tile-stat-num">
                {percentComplete}
              </data>
              <span className="tile-stat-label">
                {"funded"}
              </span>
            </li>

            <li>
              <data className="tile-stat-num">
                {formattedAmountPledged}
              </data>
              <span className="tile-stat-label">
                {"pledged"}
              </span>
            </li>

            <li>
              <data className="tile-stat-num">
                {daysLeft}
              </data>
              <span className="tile-stat-label">
                {"days to go"}
              </span>
            </li>
          </ul>

        </div>

      </div>
    );
  }

});

module.exports = ProjectTile;
