// search bar component of nav header

var React = require('react');
var ApiUtil = require('../../utils/apiUtil');

var SearchBar = React.createClass({
  getInitialState: function () {
    return { term: null };
  },

  handleInput: function (e) {
    this.setState({ term: e.currentTarget.value });
    // only start searching once the term is at least 2 characters
    if (e.currentTarget.value.length > 1) {
      ApiUtil.globalSearch(e.currentTarget.value);
    }
  },

  clearDefault: function (e) {
    if (!this.state.term) {
      this.setState({ term: "" });
    }
  },

  restoreDefault: function (e) {
    if (this.state.term.length === 0) {
      this.setState({ term: null });
    }
  },

  render: function () {
    return (
      <div className="search-bar group">
        <div className="magnifying-glass-icon" />
        <input type="text" className="search-bar-input"
          defaultValue="Search Projects" value={this.state.term}
          onChange={this.handleInput} onFocus={this.clearDefault}
          onBlur={this.restoreDefault} />
      </div>
    );
  }

});

module.exports = SearchBar;
