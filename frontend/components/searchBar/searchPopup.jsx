// component that pops up to show live search results

var React = require('react');
var ProjectTile = require('../projectPanels/projectTile');

var SearchPopup = React.createClass({
  handleClose: function (e) {
    this.props.clear();
  },

  render: function () {
    var tiles, resultsButton;
    if (this.props.results.length > 0) {
      tiles = this.props.results.map( function (result) {
        return <ProjectTile key={result.id} project={result}
          closeSearch={this.handleClose} />;
      }.bind(this));
      resultsButton = (
        <button className="all-search-button">
          {"See all results for "}
          <span className="search-button-term">
            {this.props.term}
          </span>
        </button>
      );
    }

    return (
      <div className="search-popup group">

        <div className="search-close-bar group">
          <div className="search-close-button" onClick={this.handleClose}>
            {"\u2716"}
          </div>
        </div>

        <div className="search-tiles group">
          {tiles}
        </div>

        {resultsButton}

      </div>
    );
  }

});

module.exports = SearchPopup;
