// main component for project/unlaunched project edit page

var React = require('react');

var EditProjectPage = React.createClass({

  // <form className="project-start-form group"
  // onSubmit={this.handleSubmit}>
  //
  // <p className="project-start-prompt">
  // {"I want to start a "}
  // <select className="project-start-category"
  // onChange={this.updateCategory}>
  // {categoryOptions}
  // </select>
  // {" project called"}
  // </p>
  //
  // <input type="text" className="project-start-name"
  // placeholder="title..." value={this.state.title}
  // onChange={this.updateTitle} />
  //
  // <input type="submit" className="project-start-submit"
  // value="Start" />
  // </form>
  render: function () {
    return (
      <div className="project-edit-background">
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
            <div className="project-edit-image-upload">
            </div>
          </div>
          <div className="project-edit-item-box group">
            <label className="project-edit-item-label">
              {"Secondary project image"}
            </label>
            <div className="project-edit-image-upload">
            </div>
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
