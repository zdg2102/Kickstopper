var categoryConstants = require('../constants/categoryConstants');
var AppDispatcher = require('../dispatcher/dispatcher');

var CategoryActions = {
  receiveCategoryTree: function (categoryTree) {
		var action = {
			actionType: categoryConstants.CATEGORY_TREE_RECEIVED,
			categoryTree: categoryTree
		};
		AppDispatcher.dispatch(action);
	}
};

module.exports = CategoryActions;
