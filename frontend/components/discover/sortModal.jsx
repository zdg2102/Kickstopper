// modal dropdown for choosing sort type

var React = require('react');

var SortModal = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  catchClickOn: function (e) {
    // prevent a click from hitting the overlay if it was on the content
    e.stopPropagation();
  },

  handleClickAway: function (e) {
    this.props.close();
  },

  handleSelection: function (sortParam, e) {
    this.context.router.push({ pathname: this.props.currentPath,
      query: { sort: sortParam } });
    this.props.close();
  },

	render: function () {

		return (
      <div className="modal-overlay" onClick={this.handleClickAway}>

        <div className="modal-content sort-modal" onClick={this.catchClickOn}>
          <h2 className="modal-main-item"
            onClick={this.handleSelection.bind(this, "popularity")}>
            {"Popularity"}
          </h2>
          <h2 className="modal-main-item"
            onClick={this.handleSelection.bind(this, "newest")}>
            {"Newest"}
          </h2>
          <h2 className="modal-main-item"
            onClick={this.handleSelection.bind(this, "endDate")}>
            {"End Date"}
          </h2>
          <h2 className="modal-main-item"
            onClick={this.handleSelection.bind(this, "mostFunded")}>
            {"Most Funded"}
          </h2>
        </div>

      </div>
		);
	}

});

module.exports = SortModal;
