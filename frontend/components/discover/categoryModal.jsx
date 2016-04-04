// modal dropdown for choosing category and subcategory

var React = require('react');

var CategoryModal = React.createClass({
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

  handleCategoryClick: function (category, e) {
    var sort = this.props.sort;
    if (category === "") {
      // set to everything, so back to discover root
      this.context.router.push({ pathname: "/discover",
        query: { sort: sort } });
    } else {
      this.context.router.push({ pathname: "/discover/categories/" +
        category.nameParam,
        query: { sort: sort } });
    }
    this.props.close();
  },

  handleSubcategoryClick: function (category, subcategory, e) {
    var sort = this.props.sort;
    this.context.router.push({ pathname: "/discover/categories/" +
      category.nameParam + "/" + subcategory.name_param,
      query: { sort: sort } });
    this.props.close();
  },

	render: function () {
    var tree = this.props.prunedTree.map( function (branch) {
      var sublist;
      if (branch.subcategories) {
        var subs = branch.subcategories.map( function (sub) {
          return <li key={sub.name} className="modal-sub-item"
            onClick={this.handleSubcategoryClick.bind(this, branch, sub)}>
            {sub.name}
          </li>;
        }.bind(this));
        sublist = (
          <ul className="modal-sub-item-list">
            {subs}
          </ul>
        );
      }
      return (
        <div key={branch.name}>
          <h2 className="modal-main-item"
            onClick={this.handleCategoryClick.bind(this, branch)}>{branch.name}</h2>
          {sublist}
        </div>
      );
    }.bind(this));

		return (
      <div className="modal-overlay" onClick={this.handleClickAway}>

        <div className="modal-content category-modal" onClick={this.catchClickOn}>
          <h2 className="modal-main-item"
            onClick={this.handleCategoryClick.bind(this, "")}>{"Everything"}</h2>
          {tree}
        </div>

      </div>
		);
	}

});

module.exports = CategoryModal;
