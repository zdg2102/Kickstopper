// modal dropdown for choosing sort type

var React = require('react');
var ReactModal = require('react-modal');

var SortModal = React.createClass({
  catchClickOn: function (e) {
    // prevent a click from hitting the overlay if it was on the content
    e.stopPropagation();
  },

  handleClickAway: function (e) {
    this.props.close();
  },

	render: function () {

		return (
      <div className="modal-overlay" onClick={this.handleClickAway}>

        <div className="modal-content sort-modal" onClick={this.catchClickOn}>
          <h2 className="modal-main-item">{"Everything"}</h2>
          <h2 className="modal-main-item">{"Neighbors"}</h2>
          <h2 className="modal-main-item">{"Media And Arts"}</h2>
          <h2 className="modal-main-item">{"Daily Life"}</h2>
          <h2 className="modal-main-item">{"Work"}</h2>
        </div>

      </div>
		);
	}

});

module.exports = SortModal;
