// Page to select project category and name

var React = require('react');
var CategoryStore = require('../../stores/categoryStore');
var ApiUtil = require('../../utils/apiUtil');

var StartProjectPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { category: "", title: "", categories: [] };
  },

  componentDidMount: function () {
    this.categoryStoreToken = CategoryStore
      .addListener(this.updateCategories);
    ApiUtil.getCategoryTree();
  },

  componentWillUnmount: function () {
    this.categoryStoreToken.remove();
  },

  updateCategories: function () {
    this.setState({ categories: CategoryStore.prunedTree() });
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var params = { title: this.state.title };
    ApiUtil.createUnlaunchedProject(
      params,
      function (newProject) {
        this.context.router.push({
          pathname: "/unlaunched/" + newProject.id + "/edit",
          query: { category: this.state.category }
        });
      }.bind(this)
    );
  },

  updateTitle: function (e) {
    this.setState({ title: e.currentTarget.value });
  },

  updateCategory: function (e) {
    this.setState({ category: e.currentTarget.value });
  },

  render: function () {
    var categoryOptions;
    if (this.state.categories.length > 0) {
      categoryOptions = this.state.categories.map(function (category) {
        return <option value={category.nameParam} key={category.name}>
          {category.name}
        </option>;
      })
      categoryOptions.unshift(
        <option value={""} key={"blank"}>{""}</option>
      );
    }

    return (
      <div className="project-start-background">
        <div className="project-start-box">
          <h2 className="project-start-header">
            {"What are you going to stop?"}
          </h2>
          <form className="project-start-form group"
            onSubmit={this.handleSubmit}>

            <p className="project-start-prompt">
              {"I want to start a "}
              <select className="project-start-category"
                onChange={this.updateCategory}>
                {categoryOptions}
              </select>
              {" project called"}
            </p>

            <input type="text" className="project-start-name"
              placeholder="title..." value={this.state.title}
              onChange={this.updateTitle} />

            <input type="submit" className="project-start-submit"
              value="Start" />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = StartProjectPage;
