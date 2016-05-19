var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var searchConstants = require('../constants/searchConstants');

var SearchStore = new Store(AppDispatcher);

var _results = [];

SearchStore.all = function () {
  // guarantees only four results will be returned
  return _results.slice(0, 4);
};

SearchStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case searchConstants.SEARCH_RESULTS_RECEIVED:
      _results = payload.results;
      SearchStore.__emitChange();
      break;
  }
};

module.exports = SearchStore;
