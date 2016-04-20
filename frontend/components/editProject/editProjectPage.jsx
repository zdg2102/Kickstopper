// main component for project/unlaunched project edit page

var React = require('react');

var EditProjectPage = React.createClass({
  getInitialState: function () {
    return {
      mainImageUrl: "",
      mainImageFile: null,
      secondaryImageUrl: "",
      secondaryImageFile: null,
      title: "",
      blurb: "",
      duration: "",
      goal: "",
      description: "",
      rewardOneMin: "",
      rewardOneDesc: "",
      rewardTwoMin: "",
      rewardTwoDesc: "",
      rewardThreeMin: "",
      rewardThreeDesc: "",
      mainImageError: false,
      secondaryImageError: false,
      titleError: false,
      blurbError: false,
      durationError: false,
      goalError: false,
      descriptionError: false,
      rewardOneMinError: false,
      rewardOneDescError: false,
      rewardTwoMinError: false,
      rewardTwoDescError: false,
      rewardThreeMinError: false,
      rewardThreeDescError: false,
      errorMessages: []
    };
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

  },

  saveProject: function () {

  },

  render: function () {
    var mainImage, secondaryImage;
    if (this.state.mainImageUrl.length > 0) {
      mainImage = <img className="project-edit-preview"
        src={this.state.mainImageUrl} />;
    }
    if (this.state.secondaryImageUrl.length > 0) {
      secondaryImage = <img className="project-edit-preview"
        src={this.state.secondaryImageUrl} />;
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
        <form className="project-edit-form">
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Main project image"}
            </label>
            <input type="file" className="project-edit-image-upload"
              onChange={this.handleImageUpload.bind(this, "main")}>
            </input>
            {mainImage}
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Secondary project image"}
            </label>
            <input type="file" className="project-edit-image-upload"
              onChange={this.handleImageUpload.bind(this, "secondary")}>
            </input>
            {secondaryImage}
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Project title"}
            </label>
            <input type="text" className="project-edit-item-input" />
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Short blurb"}
            </label>
            <textarea className="project-edit-item-textarea">
            </textarea>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Funding duration (in days)"}
            </label>
            <input type="text" className="project-edit-item-input" />
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Funding goal"}
            </label>
            <input type="text" className="project-edit-item-input" />
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Project description"}
            </label>
            <textarea className="project-edit-item-textarea">
            </textarea>
          </div>
          <label className="project-edit-reward-label">
            {"Reward #1 (mandatory)"}
          </label>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Minimum pledge"}
            </label>
            <input type="text" className="project-edit-item-input" />
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Description"}
            </label>
            <textarea className="project-edit-item-textarea">
            </textarea>
          </div>
          <label className="project-edit-reward-label">
            {"Reward #2 (optional)"}
          </label>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Minimum pledge"}
            </label>
            <input type="text" className="project-edit-item-input" />
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Description"}
            </label>
            <textarea className="project-edit-item-textarea">
            </textarea>
          </div>
          <label className="project-edit-reward-label">
            {"Reward #3 (optional)"}
          </label>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Minimum pledge"}
            </label>
            <input type="text" className="project-edit-item-input" />
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Description"}
            </label>
            <textarea className="project-edit-item-textarea">
            </textarea>
          </div>
        </form>
      </div>
    );
  }

});

module.exports = EditProjectPage;
