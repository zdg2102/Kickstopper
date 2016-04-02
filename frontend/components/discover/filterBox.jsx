// box at top of discover page, for showing filter/sort options

var React = require('react');

var FilterBox = React.createClass({

	render: function () {
		return (
      <div className="filter-box">

				<div className="filter-text-line">
					<span className="filter-box-dropdown filter">
						{"Everything"}
						<a className="filter-box-arrow"></a>
					</span>

					<h2 className="filter-box-text">
						{" sorted by "}
					</h2>

					<span className="filter-box-dropdown sort">
						{"End Date"}
						<a className="filter-box-arrow"></a>
					</span>

				</div>

      </div>
		);
	}

});

module.exports = FilterBox;
