var ProjectActions = require('../actions/projectActions');
var SessionActions = require('../actions/sessionActions');
var CategoryActions = require('../actions/categoryActions');
var SearchActions = require('../actions/searchActions');
var CheckoutActions = require('../actions/checkoutActions');

var ApiUtil = {
  getProjectMain: function (projectId) {
		$.ajax({
			type: 'GET',
			url: '/api/projects/' + projectId,
			dataType: 'json',
			data: 'detailType=main',
			success: function (project) {
        ProjectActions.receiveSingleProject(project);
			}
		});
	},

	getFilteredProjects: function (params) {
		$.ajax({
			type: 'GET',
			url: '/api/projects/',
			dataType: 'json',
			data: {projects: params},
			success: function (projects) {
				ProjectActions.receiveAllProjects(projects);
			}
		});
	},

	getNextPageProjects: function (params, pageNum) {
    // add pageNum to params
    params.page = pageNum;
		$.ajax({
			type: 'GET',
			url: '/api/projects/',
			dataType: 'json',
			data: {projects: params},
			success: function (projects) {
				ProjectActions.receiveNewPageProjects(projects);
			}
		});
	},

  globalSearch: function (term) {
    $.ajax({
      type: 'GET',
      url: '/api/searches/search',
      dataType: 'json',
      data: {term: term},
      success: function (projects) {
        SearchActions.receiveSearchResults(projects);
      }
    });
  },

  login: function (credentials, successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: {user: credentials},
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        if (successCallback) { successCallback(); }
      },
      error: function () {
        if (errorCallback) { errorCallback(); }
      }
    });
  },

  signup: function (userInfo, successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      url: "/api/users",
      dataType: "json",
      data: { user: userInfo },
      success: function (newUser) {
        SessionActions.receiveCurrentUser(newUser);
        if (successCallback) { successCallback(); }
      },
      error: function (error) {
        if (errorCallback) { errorCallback(error); }
      }
    });
  },

  logout: function () {
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      dataType: "json",
      success: function () {
        SessionActions.logout();
      }
    });
  },

  getCurrentUser: function (completion) {
    $.ajax({
      type: 'GET',
      url: '/api/session/current',
      dataType: 'json',
      success: function (currentUser) {
        // if currentUser is empty object, there is no current session
        // only trigger further action if a session was received
        if (Object.keys(currentUser).length !== 0) {
          SessionActions.receiveCurrentUser(currentUser);
        }
      },
      complete: function () {
        if (completion) { completion(); }
      }
    });
  },

  getCategoryTree: function () {
    $.ajax({
      type: 'GET',
      url: '/api/categories',
      dataType: 'json',
      success: function (categoryTree) {
        CategoryActions.receiveCategoryTree(categoryTree);
      }
    });
  },

  createCheckout: function (params, successCallback, errorCallback) {
    $.ajax({
      type: 'POST',
      url: '/api/checkouts',
      dataType: 'json',
      data: { checkout: params },
      success: function (checkout) {
        CheckoutActions.receiveCheckout(checkout);
        if (successCallback) { successCallback(checkout); }
      },
      error: function () {
        if (errorCallback) { errorCallback(); }
      }
    });
  },

  getCheckout: function (checkoutId, successCallback, errorCallback) {
    $.ajax({
      type: 'GET',
      url: '/api/checkouts/' + checkoutId,
      dataType: 'json',
      success: function (checkout) {
        CheckoutActions.receiveCheckout(checkout);
        if (successCallback) { successCallback(); }
      },
      error: function () {
        if (errorCallback) { errorCallback(); }
      }
    });
  },

  createPledgeFromCheckout: function (checkoutId) {
    $.ajax({
      type: 'POST',
      url: '/api/pledges',
      dataType: 'json',
      data: { checkoutId: checkoutId },
      success: function () {
        // FINDTAG temp
        console.log("checkout destroyed");

      }
    });
  }
};

module.exports = ApiUtil;
