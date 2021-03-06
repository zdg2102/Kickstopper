// main display component for each project's main page

var React = require('react');
var ProjectStore = require('../../stores/projectStore');
var ApiUtil = require('../../utils/apiUtil');
var MainStatsPanel = require('./mainStatsPanel');
var CreatorPanel = require('./creatorPanel');
var MainDescription = require('./mainDescription');
var RewardsPanel = require('./rewardsPanel');

var ProjectMain = React.createClass({
  getInitialState: function () {
    return {project: ProjectStore.find(this.props.params.projectId)};
  },

  componentDidMount: function () {
    this.projectStoreToken = ProjectStore.addListener(this.refresh);
    ApiUtil.getProjectMain(this.props.params.projectId);
  },

  componentWillUnmount: function () {
    this.projectStoreToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.getProjectMain(newProps.params.projectId);
  },

  componentDidUpdate: function () {
    window.scrollTo(0, 0);
  },

  refresh: function () {
    this.setState({project: ProjectStore.find(this.props.params.projectId)});
  },

  render: function () {
    var title, creatorName, blurb, imageUrl;
    if (this.state.project) {
      title = this.state.project.title;
      creatorName = this.state.project.creator_name;
      blurb = this.state.project.project_blurb;
      imageUrl = this.state.project.main_image_url;
    }

    return (
      <div>

        <section className="project-main-info">

          <div className="project-main-info-container">

            <div className="project-title-bar">
              <h1 className="project-title">{title}</h1>
              <h6 className="project-byline">
                {"by "}
                <span className="creator-name">
                  {creatorName}
                </span>
              </h6>
            </div>

            <div className="video-panel group">
              <div className="video">
                <img className="project-main-picture" src={imageUrl} />
              </div>
              <MainStatsPanel project={this.state.project} />
            </div>

            <div className="blurb-panel group">
              <p className="project-blurb">{blurb}</p>
              <CreatorPanel project={this.state.project} />
            </div>

          </div>

        </section>

        <span className="project-page-divider">
          {"Campaign"}
        </span>

        <section className="project-detail-info group">
          <MainDescription project={this.state.project} />
          <RewardsPanel project={this.state.project} />
        </section>

      </div>
    );

  }

});

module.exports = ProjectMain;
