// main component for project/unlaunched project edit page

var React = require('react');
var CategoryStore = require('../../stores/categoryStore');
var ApiUtil = require('../../utils/apiUtil');

var EditProjectPage = React.createClass({
  getInitialState: function () {
    return {
      categoryTree: [],
      fetchedInitialData: true,
      mainImageUrl: "",
      mainImageFile: null,
      secondaryImageUrl: "",
      secondaryImageFile: null,
      title: "",
      category: "",
      subcategory: "",
      blurb: "",
      duration: "",
      goal: "",
      description: "",
      rewardOneMin: "",
      rewardOneTitle: "",
      rewardOneDesc: "",
      rewardTwoMin: "",
      rewardTwoTitle: "",
      rewardTwoDesc: "",
      rewardThreeMin: "",
      rewardThreeTitle: "",
      rewardThreeDesc: "",
      mainImageError: false,
      secondaryImageError: false,
      titleError: false,
      categoryError: false,
      subcategoryError: false,
      blurbError: false,
      durationError: false,
      goalError: false,
      descriptionError: false,
      rewardOneMinError: false,
      rewardOneTitleError: false,
      rewardOneDescError: false,
      rewardTwoMinError: false,
      rewardTwoTitleError: false,
      rewardTwoDescError: false,
      rewardThreeMinError: false,
      rewardThreeTitleError: false,
      rewardThreeDescError: false,
      errorMessages: []
    };
  },

  componentDidMount: function () {
    this.categoryStoreToken = CategoryStore
      .addListener(this.updateCategories);
    ApiUtil.getCategoryTree();
    if (this.props.location.query.category) {
      this.setState({ category: this.props.location.query.category });
    }
    ApiUtil.getUnlaunchedProject(
      this.props.params.unlaunchedProjectId,
      function (project) {
        this.initialUpdate(project);
      }.bind(this)
    )
  },

  componentWillUnmount: function () {
    this.categoryStoreToken.remove();
  },

  updateCategories: function (arg) {
    var category = arg || this.state.category
    var newTree = CategoryStore.prunedTree(category);
    this.setState({ categoryTree: newTree });
  },

  initialUpdate: function (project) {
    // only update once, to avoid overwriting data the user
    // is partway through completing if the
    // unlaunched projects store somehow gets re-triggered
    if (!this.state.fetchedInitialData) {
      this.setState({
        mainImageUrl: "",
        mainImageFile: null,
        secondaryImageUrl: "",
        secondaryImageFile: null,
        title: "",
        category: "",
        subcategory: "",
        blurb: "",
        duration: "",
        goal: "",
        description: "",
        rewardOneMin: "",
        rewardOneTitle: "",
        rewardOneDesc: "",
        rewardTwoMin: "",
        rewardTwoTitle: "",
        rewardTwoDesc: "",
        rewardThreeMin: "",
        rewardThreeTitle: "",
        rewardThreeDesc: ""
      });
    }
  },

  handleImageUpload: function (imageName, e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];
    var urlKey = imageName + "ImageUrl";
    var fileKey = imageName + "ImageFile";
    reader.onloadend = function () {
      newState = {};
      newState[urlKey] = reader.result;
      newState[fileKey] = file;
      this.setState(newState);
    }.bind(this);
    if (file) {
      reader.readAsDataURL(file);
    } else {
      newState = {};
      newState[urlKey] = "";
      newState[fileKey] = null;
      this.setState(newState);
    }
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var newState = {};
    newState.errorMessages = [];
    if (this.state.mainImageUrl.length === 0) {
      newState.mainImageError = true;
      newState.errorMessages.push("Must have main image");
    }
    if (this.state.secondaryImageUrl.length === 0) {
      newState.secondaryImageError = true;
      newState.errorMessages.push("Must have secondary image");
    }
    if (this.state.title.length === 0) {
      newState.titleError = true;
      newState.errorMessages.push("Must have title");
    }
    if (this.state.category.length === 0) {
      newState.categoryError = true;
      newState.errorMessages.push("Must have category");
    }
    if (this.state.subcategory.length === 0) {
      newState.subcategoryError = true;
      newState.errorMessages.push("Must have subcategory");
    }
    if (this.state.duration.length === 0) {
      newState.durationError = true;
      newState.errorMessages.push("Must have a funding duration");
    } else if (!parseInt(this.state.duration, 10) > 0) {
      newState.durationError = true;
      newState.errorMessages.push("Funding duration must be greater " +
      "than zero");
    }
    if (this.state.goal.length === 0) {
      newState.goalError = true;
      newState.errorMessages.push("Must have a funding goal");
    } else if (!parseInt(this.state.goal, 10) > 0) {
      newState.goalError = true;
      newState.errorMessages.push("Funding goal must be greater " +
      "than zero");
    }
    if (this.state.rewardOneMin.length === 0) {
      newState.rewardOneMinError = true;
      newState.errorMessages.push("Must have a minimum pledge for " +
      "Reward #1");
    } else if (!parseInt(this.state.rewardOneMin, 10) > 0) {
      newState.rewardOneMinError = true;
      newState.errorMessages.push("Reward #1 minimum pledge must " +
      "be greater than zero");
    }

    if (newState.errorMessages.length > 0) {
      this.setState(newState);
    } else {
      this.saveProject();
    }
  },

  saveProject: function () {

    console.log("yay");
  },

  handleTextInput: function (fieldName, e) {
    var newState = {};
    newState[fieldName] = e.currentTarget.value;
    newState[fieldName + "Error"] = false;
    newState.errorMessages = [];
    this.setState(newState);
    // additionally, if the category selection was updated, also
    // update the category tree
    if (fieldName === "category") { this
      .updateCategories(e.currentTarget.value); }
  },

  handleIntInput: function (fieldName, e) {
    var intReg = /^\d*$/;
    if (e.currentTarget.value.match(intReg)) {
      var newState = {};
      newState[fieldName] = e.currentTarget.value;
      newState[fieldName + "Error"] = false;
      newState.errorMessages = [];
      this.setState(newState);
    }
  },

  render: function () {
    var mainImageError, secondaryImageError, titleError,
      categoryError, subcategoryError, blurbError, durationError,
      goalError, descriptionError, rewardOneMinError,
      rewardOneDescError, rewardTwoMinError, rewardTwoDescError,
      rewardThreeMinError, rewardThreeDescError, rewardOneTitleError,
      rewardTwoTitleError, rewardThreeTitleError;

    mainImageError = this.state.mainImageError ? " error" : "";
    secondaryImageError = this.state.secondaryImageError ? " error" : "";
    titleError = this.state.titleError ? " error" : "";
    categoryError = this.state.categoryError ? " error" : "";
    subcategoryError = this.state.subcategoryError ? " error" : "";
    blurbError = this.state.blurbError ? " error" : "";
    durationError = this.state.durationError ? " error" : "";
    goalError = this.state.goalError ? " error" : "";
    descriptionError = this.state.descriptionError ? " error" : "";
    rewardOneMinError = this.state.rewardOneMinError ? " error" : "";
    rewardOneTitleError = this.state.rewardOneTitleError ? " error" : "";
    rewardOneDescError = this.state.rewardOneDescError ? " error" : "";
    rewardTwoMinError = this.state.rewardTwoMinError ? " error" : "";
    rewardTwoTitleError = this.state.rewardTwoTitleError ? " error" : "";
    rewardTwoDescError = this.state.rewardTwoDescError ? " error" : "";
    rewardThreeMinError = this.state.rewardThreeMinError ? " error" : "";
    rewardThreeTitleError = this.state.rewardThreeTitleError ? " error" : "";
    rewardThreeDescError = this.state.rewardThreeDescError ? " error" : "";

    var errorList;
    if (this.state.errorMessages.length > 0) {
      errorList = this.state.errorMessages.map( function (error, idx) {
        return <span key={idx} className="edit-error">{error}</span>;
      });
      errorList = (
        <div className="edit-error-list">
          {errorList}
        </div>
      );
    }

    var mainImage, secondaryImage;
    if (this.state.mainImageUrl.length > 0) {
      mainImage = <img className="project-edit-preview"
        src={this.state.mainImageUrl} />;
    }
    if (this.state.secondaryImageUrl.length > 0) {
      secondaryImage = <img className="project-edit-preview"
        src={this.state.secondaryImageUrl} />;
    }

    var categoryOptions = [];
    var subcategoryOptions = [];;
    for (var i = 0; i < this.state.categoryTree.length; i++) {
      categoryOptions.push(
        <option key={this.state.categoryTree[i].nameParam}
          value={this.state.categoryTree[i].nameParam}>
          {this.state.categoryTree[i].name}
        </option>
      );
      if (this.state.categoryTree[i].subcategories) {
        var subcats = this.state.categoryTree[i].subcategories
        for (var j = 0; j < subcats.length; j++) {
          subcategoryOptions.push(
            <option key={subcats[j].name_param}
              value={subcats[j].name_param}>
              {subcats[j].name}
            </option>
          );
        }
      }
    }

    return (
      <div className="project-edit-background">
        <div className="project-edit-button-container group">
          <button className="project-edit-submit"
            onClick={this.handleSubmit}>
            {"Submit"}
          </button>
        </div>
        <h2 className="project-edit-header">
          {"Start building your project!"}
        </h2>
        <h3 className="project-edit-subheader">
          {"Add an image, a goal, and other important details."}
        </h3>

        {errorList}

        <form className="project-edit-form">
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Main project image"}
            </label>
            <input type="file" className={"project-edit-image-upload"
              + mainImageError}
              onChange={this.handleImageUpload.bind(this, "main")}>
            </input>
            {mainImage}
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Secondary project image"}
            </label>
            <input type="file" className={"project-edit-image-upload"
              + secondaryImageError}
              onChange={this.handleImageUpload.bind(this, "secondary")}>
            </input>
            {secondaryImage}
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Project title"}
            </label>
            <input type="text" className={"project-edit-item-input" +
              titleError}
              value={this.state.title}
              onChange={this.handleTextInput.bind(this, "title")}/>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Project category"}
            </label>
            <select value={this.state.category}
              className={"project-edit-item-select" + categoryError}
              onChange={this.handleTextInput.bind(this, "category")}>
              <option value="">{""}</option>
              {categoryOptions}
            </select>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Project subcategory"}
            </label>
            <select value={this.state.subcategory}
              className={"project-edit-item-select" + subcategoryError}
              onChange={this.handleTextInput.bind(this, "subcategory")}>
              <option value="">{""}</option>
              {subcategoryOptions}
            </select>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Short blurb"}
            </label>
            <textarea className={"project-edit-item-textarea" +
              blurbError}
              value={this.state.blurb}
              onChange={this.handleTextInput.bind(this, "blurb")}>
            </textarea>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Funding duration (in days)"}
            </label>
            <input type="text" className={"project-edit-item-input" +
              durationError}
              value={this.state.duration}
              onChange={this.handleIntInput.bind(this, "duration")}/>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Funding goal"}
            </label>
            <input type="text" className={"project-edit-item-input" +
              goalError}
              value={this.state.goal}
              onChange={this.handleIntInput.bind(this, "goal")}/>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Project description"}
            </label>
            <textarea className={"project-edit-item-textarea" +
              descriptionError}
              value={this.state.description}
              onChange={this.handleTextInput.bind(this, "description")}>
            </textarea>
          </div>
          <label className="project-edit-reward-label">
            {"Reward #1 (mandatory)"}
          </label>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Minimum pledge"}
            </label>
            <input type="text" className={"project-edit-item-input" +
              rewardOneMinError}
              value={this.state.rewardOneMin}
              onChange={this.handleIntInput.bind(this, "rewardOneMin")}/>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Reward title"}
            </label>
            <input type="text" className={"project-edit-item-input" +
              rewardOneTitleError}
              value={this.state.rewardOneTitle}
              onChange={this.handleTextInput.bind(this, "rewardOneTitle")}/>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Description"}
            </label>
            <textarea className={"project-edit-item-textarea" +
              rewardOneDescError}
              value={this.state.rewardOneDesc}
              onChange={this.handleTextInput.bind(this, "rewardOneDesc")}>
            </textarea>
          </div>
          <label className="project-edit-reward-label">
            {"Reward #2 (optional)"}
          </label>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Minimum pledge"}
            </label>
            <input type="text" className={"project-edit-item-input" +
              rewardTwoMinError}
              value={this.state.rewardTwoMin}
              onChange={this.handleIntInput.bind(this, "rewardTwoMin")}/>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Reward title"}
            </label>
            <input type="text" className={"project-edit-item-input" +
              rewardTwoTitleError}
              value={this.state.rewardTwoTitle}
              onChange={this.handleTextInput.bind(this, "rewardTwoTitle")}/>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Description"}
            </label>
            <textarea className={"project-edit-item-textarea" +
              rewardTwoDescError}
              value={this.state.rewardTwoDesc}
              onChange={this.handleTextInput.bind(this, "rewardTwoDesc")}>
            </textarea>
          </div>
          <label className="project-edit-reward-label">
            {"Reward #3 (optional)"}
          </label>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Minimum pledge"}
            </label>
            <input type="text" className={"project-edit-item-input" +
              rewardThreeMinError}
              value={this.state.rewardThreeMin}
              onChange={this.handleIntInput.bind(this, "rewardThreeMin")}/>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Reward title"}
            </label>
            <input type="text" className={"project-edit-item-input" +
              rewardThreeTitleError}
              value={this.state.rewardThreeTitle}
              onChange={this.handleTextInput
                .bind(this, "rewardThreeTitle")}/>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Description"}
            </label>
            <textarea className={"project-edit-item-textarea" +
              rewardThreeDescError}
              value={this.state.rewardThreeDesc}
              onChange={this.handleTextInput.bind(this, "rewardThreeDesc")}>
            </textarea>
          </div>
        </form>
      </div>
    );
  }

});

module.exports = EditProjectPage;
