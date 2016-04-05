// selectable reward tile for pledge selection page

var React = require('react');

var RewardTilePledge = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  //
  // getInitialState: function () {
  //   return { hovered: false, expanded: false };
  // },
  //
  // handleHover: function (e) {
  //   this.setState({ hovered: true });
  // },
  //
  // handleUnhover: function (e) {
  //   this.setState({ hovered: false });
  // },
  //
  // handleClick: function (e) {
  //   this.props.click(this.props.reward.id);
  // },
  //
  // selectPledge: function (e) {
  //   this.context.router.push({
  //     pathname: "/projects/" + this.props.projectId + "/pledges/new",
  //     query: { selectedRewardId: this.props.reward.id }
  //   });
  // },

  render: function () {

    // var hoverDiv;
    // if (this.state.hovered && !this.props.clicked) {
    //   hoverDiv = (<div className="reward-tile-main-hover">
    //     <h3>{"Select this reward"}</h3>
    //   </div>);
    // }
    //
    // var selectButton;
    // var unhoverable = "";
    // if (this.props.clicked) {
    //   unhoverable = " unhoverable";
    //   selectButton = (<div>
    //     <hr className="reward-tile-hr" />
    //     <button className="reward-tile-select-button"
    //       onClick={this.selectPledge}>
    //       {"Make a pledge"}
    //     </button>
    //   </div>);
    // }

    return <div className={"reward-tile-main" + unhoverable}
      onMouseEnter={this.handleHover} onMouseLeave={this.handleUnhover} onClick={this.handleClick}>
      // {hoverDiv}
      // <div className="reward-tile-main-content">
      //   <h5 className="reward-tile-pledge">
      //     {this.props.reward.minimum_pledge}
      //   </h5>
      //
      //   <span className="reward-tile-title">
      //     {this.props.reward.title}
      //   </span>
      //
      //   <p className="reward-tile-description">
      //     {this.props.reward.description}
      //   </p>
      //
      //   {selectButton}
      //
      // </div>
    </div>;
  }

});

module.exports = RewardTilePledge;
