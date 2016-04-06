// search bar component of nav header

var React = require('react');
var ApiUtil = require('../../utils/apiUtil');

var SearchBar = React.createClass({
  handleInput: function (e) {
    this.props.updateSearchTerm(e.currentTarget.value);
  },

  render: function () {
    return (
      <div className="search-bar group">
        <div className="magnifying-glass-icon" />
        <input type="text" className="search-bar-input"
          placeholder="Search Projects" value={this.props.term}
          onChange={this.handleInput} />
      </div>
    );
  }

});

module.exports = SearchBar;
