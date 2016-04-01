// search bar component of nav header

var React = require('react');

var SearchBar = React.createClass({
  getInitialState: function () {
    return { term: "" };
  },

  render: function () {
    return (
      <div className="search-bar group">
        <div className="magnifying-glass-icon" />
        <input type="text" className="search-bar-input"
          defaultValue="Search Projects" />
      </div>
    );
  }

});

module.exports = SearchBar;
