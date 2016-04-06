var searchConstants = require('../constants/searchConstants');
var AppDispatcher = require('../dispatcher/dispatcher');

var SearchActions = {
  receiveSearchResults: function (results) {
		var action = {
			actionType: searchConstants.SEARCH_RESULTS_RECEIVED,
			results: results
		};
		AppDispatcher.dispatch(action);
	}
};

module.exports = SearchActions;
