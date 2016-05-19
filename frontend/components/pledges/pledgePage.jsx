// Page for selecting what pledge to make for a project

var React = require('react');
var ApiUtil = require('../../utils/apiUtil');
var ProjectStore = require('../../stores/projectStore');
var RewardTilePledge = require('../rewards/rewardTilePledge');

var PledgePage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { project: ProjectStore.find(this.props.params.projectId),
      clickedId: parseInt(this.props.location.query.selectedRewardId, 10),
      submissionError: false };
  },

  componentDidMount: function () {
    this.projectStoreToken = ProjectStore.addListener(this.refresh);
    ApiUtil.getProjectMain(this.props.params.projectId);
  },

  componentWillUnmount: function () {
    this.projectStoreToken.remove();
  },

  refresh: function () {
    this.setState({ project: ProjectStore.find(this.props.params.projectId) });
  },

  handleRewardClick: function (rewardId) {
    this.setState({ clickedId: rewardId, submissionError: false });
  },

  handleSubmit: function (pledgeAmount) {
    this.setState({ submissionError: false });
    ApiUtil.createCheckout(
      {
        rewardId: this.state.clickedId,
        pledgeAmount: pledgeAmount
      },
      function (newCheckout) {
        this.context.router.push("/checkouts/" + newCheckout.id);
      }.bind(this),
      function () {
        this.setState({ submissionError: true });
      }.bind(this)
    );
  },

  render: function () {

    var title, creatorName, tiles, errorMessage;
    if (this.state.project) {
      title = this.state.project.title;
      creatorName = this.state.project.creator_name;
    }
    if (this.state.project && this.state.project.rewards) {
      tiles = this.state.project.rewards.map( function (reward) {
        return <RewardTilePledge key={reward.id} reward={reward}
          click={this.handleRewardClick}
          clicked={this.state.clickedId === reward.id}
          projectId={this.state.project.id}
          submit={this.handleSubmit} />;
      }.bind(this));
    }
    if (this.state.submissionError) {
      errorMessage = <p className="pledge-submission-error">
        {"Submission error. Please try again."}
      </p>;
    }

    return (
      <div>

        <div className="pledge-page-title-bar">
          <h1 className="project-title">{title}</h1>
          <h6 className="project-byline">
            {"by " + creatorName}
          </h6>
        </div>

        {errorMessage}

        <h4 className="pledge-page-subhead">
          {"Let's choose your reward!"}
        </h4>

        {tiles}

      </div>
    );

  }

});

module.exports = PledgePage;
