// box at top of discover page when a search term has been passed to query

var React = require('react');

var SearchFilterBox = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { expanded: null };
  },

  handleSelection: function (sortParam, e) {
    this.context.router.push({ pathname: this.props.currentPath,
      query: { sort: sortParam } });
    this.props.close();
  },

  clearTerm: function () {
    // duplicate the query without a search term
    var newQuery = {};
    for (var id in this.props.currentQuery) {
      if (this.props.currentQuery.hasOwnProperty(id) &&
          id !== "term") {
        newQuery[id] = this.props.currentQuery[id];
      }
    }
    this.context.router.push({
      pathname: this.props.currentPath,
      query: newQuery
    });
  },

  handleCategoryClick: function (e) {
    if (this.state.expanded === "category") {
      this.setState({ expanded: null });
    } else {
      this.setState({ expanded: "category" });
    }
  },

  handleSortClick: function (e) {
    if (this.state.expanded === "sort") {
      this.setState({ expanded: null });
    } else {
      this.setState({ expanded: "sort" });
    }
  },

  handleSortSelection: function (sortParam, e) {
    var newQuery = this.props.currentQuery;
    newQuery.sort = sortParam;
    this.context.router.push({ pathname: this.props.currentPath,
      query: newQuery });
    this.setState({ expanded: null });
  },

  handleCategorySelection: function (category, e) {
    if (category === "") {
      // set to everything, so back to discover root
      this.context.router.push({ pathname: "/discover",
        query: this.props.currentQuery });
    } else {
      this.context.router.push({ pathname: "/discover/categories/" +
        category.nameParam,
        query: this.props.currentQuery });
    }
    this.setState({ expanded: null });
  },

  handleSubcategorySelection: function (category, subcategory, e) {
    this.context.router.push({ pathname: "/discover/categories/" +
      category.nameParam + "/" + subcategory.name_param,
      query: this.props.currentQuery });
    this.setState({ expanded: null });
  },

  render: function () {
    var prettifiedFilters = {
      searchRank: "Search Rank",
      popularity: "Popularity",
      newest: "Newest",
      endDate: "End Date",
      mostFunded: "Most Funded"
    };

    var filterName;
    if (this.props.sort && prettifiedFilters[this.props.sort]) {
      filterName = prettifiedFilters[this.props.sort];
    } else {
      filterName = prettifiedFilters.searchRank;
    }

    var categoryPopout, sortPopout;
    if (this.state.expanded === "category") {
      var subcategories;
      var expand = "";
      var categories = this.props.prunedTree.map( function (branch) {
        if (branch.subcategories) {
          expand = " expand";
          var subs = branch.subcategories.map( function (sub) {
            return <span key={sub.name} className="sort-popout-sub"
              onClick={this.handleSubcategorySelection.bind(this, branch,
              sub)}>
              {sub.name}
            </span>;
          }.bind(this));
          subcategories = (
            <div className="filter-popout-subcategory-column">
              <span className="filter-popout-subcategory-header">
                {"More in " + branch.name}
              </span>
              {subs}
            </div>
          );
        }

        return (
          <span key={branch.name} className="sort-popout-main"
            onClick={this.handleCategorySelection.bind(this,
            branch)}>
            {branch.name}
          </span>
        );
      }.bind(this));
      categoryPopout = <div className={"category-filter-popout group" + expand}>
        <div className={"filter-popout-category-column" + expand}>
          <span className="sort-popout-main"
            onClick={this.handleCategorySelection.bind(this,
            "")}>
            {"Everything"}
          </span>
          {categories}
        </div>
        {subcategories}
      </div>;
    } else if (this.state.expanded === "sort") {
      sortPopout = <div className="sort-filter-popout">
        <span className="sort-popout-main"
          onClick={this.handleSortSelection.bind(this, "searchRank")}>
          {"Search Rank"}
        </span>
        <span className="sort-popout-main"
          onClick={this.handleSortSelection.bind(this, "popularity")}>
          {"Popularity"}
        </span>
        <span className="sort-popout-main"
          onClick={this.handleSortSelection.bind(this, "newest")}>
          {"Newest"}
        </span>
        <span className="sort-popout-main"
          onClick={this.handleSortSelection.bind(this, "endDate")}>
          {"End Date"}
        </span>
        <span className="sort-popout-main"
          onClick={this.handleSortSelection.bind(this, "mostFunded")}>
          {"Most Funded"}
        </span>
      </div>;
    }

    return (
      <div className="search-filter-box">
        <div className="search-filter-text-line">
          <h2 className="search-filter-box-text">
            {"Show me "}
          </h2>

          <span className="search-filter-item" onClick={this.clearTerm}>
            <span className="search-filter-item-text">
              {this.props.term}
            </span>
            <a className="filter-term-x">{"\u2716"}</a>
          </span>

          <h2 className="search-filter-box-text">
            {" projects in "}
          </h2>

          <span className="search-filter-item pad"
            onClick={this.handleCategoryClick}>
            <span className="search-filter-item-text">
              {this.props.currentCategory}
            </span>
            <a className="search-filter-arrow"></a>
            {categoryPopout}
          </span>

          <h2 className="search-filter-box-text">
            {" sorted by "}
          </h2>

          <span className="search-filter-item pad"
            onClick={this.handleSortClick}>
            <span className="search-filter-item-text">
              {filterName}
            </span>
            <a className="search-filter-arrow"></a>
            {sortPopout}
          </span>

        </div>
      </div>
    );
  }

});

module.exports = SearchFilterBox;
