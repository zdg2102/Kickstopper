// main class for discover/search page

var React = require('react');
var ProjectStore = require('../../stores/projectStore');
var CategoryStore = require('../../stores/categoryStore');
var ApiUtil = require('../../utils/apiUtil');
var ProjectTile = require('../projectPanels/projectTile');
var DiscoverMainList = require('./discoverMainList');
var SearchFilterBox = require('./searchFilterBox');
var FilterBox = require('./filterBox');
var CategoryModal = require('./categoryModal');
var SortModal = require('./sortModal');

var DiscoverPage = React.createClass({

  // NOTE add message if projects list returns with length 0

	getInitialState: function () {
    return { projects: ProjectStore.all(), openModal: null,
      currentCategory: "", prunedTree: [], pageNum: 1 };
	},

	componentDidMount: function () {
    this.projectStoreToken = ProjectStore.addListener(this.refresh);
    this.categoryStoreToken = CategoryStore.addListener(this.updateCategories);
		var params = $.extend({}, this.props.location.query, this.props.params);
		ApiUtil.getFilteredProjects(params);
    ApiUtil.getCategoryTree();
	},

	componentWillReceiveProps: function (newProps) {
		var params = $.extend({}, newProps.location.query, newProps.params);
    ApiUtil.getFilteredProjects(params);
    ApiUtil.getCategoryTree();
    // this means we changed the url, so pagination goes back to 1
    this.setState({ pageNum: 1 });
	},

	componentWillUnmount: function () {
    this.projectStoreToken.remove();
    this.categoryStoreToken.remove();
	},

	refresh: function () {
    this.setState({ projects: ProjectStore.all() });
	},

  updateCategories: function () {
    var params = $.extend({}, this.props.location.query, this.props.params);
    var currentCategory = "";
    var prunedTree = [];
    if (params.subcategoryName) {
      currentCategory = CategoryStore.currentCategoryOrSubcategory(
        params.subcategoryName
      );
      prunedTree = CategoryStore.prunedTree(params.subcategoryName);
    } else if (params.categoryName) {
      currentCategory = CategoryStore.currentCategoryOrSubcategory(
        params.categoryName
      );
      prunedTree = CategoryStore.prunedTree(params.categoryName);
    }
    // if it's blank because nothing was passed or because a bad param
    // was passed, default to 'Everything'
    if (!currentCategory || currentCategory.length === 0) {
      currentCategory = "Everything";
      prunedTree = CategoryStore.prunedTree("");
    }
    this.setState({ currentCategory: currentCategory,
      prunedTree: prunedTree });
  },

  openCategoryModal: function (e) {
    this.setState({ openModal: "category" });
  },

  openSortModal: function (e) {
    this.setState({ openModal: "sort" });
  },

  closeModals: function (e) {
    this.setState({ openModal: null });
  },

	newPage: function (e) {
    var params = $.extend({}, this.props.location.query, this.props.params);
    ApiUtil.getNextPageProjects(params, this.state.pageNum + 1);
    this.setState({ pageNum: this.state.pageNum + 1 });
	},

  render: function () {
    var discoverParams = $.extend({}, this.props.location.query,
      this.props.params);
    var sort = discoverParams.sort;
    var term = discoverParams.term;
    var currentPath = "/discover";
    if (discoverParams.categoryName) {
      currentPath = currentPath + "/categories/" + discoverParams.categoryName;
    }
    if (discoverParams.subcategoryName) {
      currentPath = currentPath + "/" + discoverParams.subcategoryName;
    }

    var currentModal;
    var modalOn = false;
    if (this.state.openModal === "category") {
      currentModal = <CategoryModal close={this.closeModals}
        prunedTree={this.state.prunedTree}
        sort={sort} />;
      modalOn = true;
    } else if (this.state.openModal === "sort") {
      currentModal = <SortModal close={this.closeModals}
        currentPath={currentPath}
        sort={sort} />;
      modalOn = true;
    }

    var filterBox;
    if (this.props.location.query.term) {
      filterBox = <SearchFilterBox term={term} sort={sort}
        prunedTree={this.state.prunedTree}
        currentPath={currentPath}
        currentQuery={this.props.location.query}
        currentCategory={this.state.currentCategory} />;
    } else {
      filterBox = <FilterBox openCategoryModal={this.openCategoryModal}
        openSortModal={this.openSortModal}
        currentCategory={this.state.currentCategory}
        sort={sort} />;
    }

    return (
			<div className="discover-page-content">

        {currentModal}

        {filterBox}

        <div className="discover-lists-container">

					<DiscoverMainList projects={this.state.projects}
            modalOn={modalOn} />

					<button className="expand-list-button"
						onClick={this.newPage}>
						{"Load more"}
					</button>

        </div>

			</div>
		);
	}

});

module.exports = DiscoverPage;
