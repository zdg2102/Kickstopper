var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var categoryConstants = require('../constants/categoryConstants');

var CategoryStore = new Store(AppDispatcher);

var _categoryTree = null;

CategoryStore.allCategories = function () {
  var all = [];
  for (var i = 0; i < _categoryTree.length; i++) {
    all.push(_categoryTree[i].name);
  }
  return all;
};

CategoryStore.currentCategoryOrSubcategory = function (paramName) {
  for (var i = 0; i < _categoryTree.length; i++) {
    if (_categoryTree[i].name_param === paramName) {
      return _categoryTree[i].name;
    } else {
      for (var j = 0; j < _categoryTree[i].subcategories.length; j++) {
        if (_categoryTree[i].subcategories[j].name_param === paramName) {
          return _categoryTree[i].subcategories[j].name;
        }
      }
    }
  }
};

CategoryStore.prunedTree = function (paramName) {
  // returns the tree with only the currently active branch showing children
  var tree = [];
  for (var i = 0; i < _categoryTree.length; i++) {
    var activeBranch = false;
    if (_categoryTree[i].name_param === paramName) {
      activeBranch = true;
    } else {
      for (var j = 0; j < _categoryTree[i].subcategories.length; j++) {
        if (_categoryTree[i].subcategories[j].name_param === paramName) {
          activeBranch = true;
        }
      }
    }
    if (activeBranch) {
      tree.push({ id: _categoryTree[i].id,
        name: _categoryTree[i].name,
        nameParam: _categoryTree[i].name_param,
        subcategories: _categoryTree[i].subcategories });
    } else {
      tree.push({ id: _categoryTree[i].id,
        name: _categoryTree[i].name,
        nameParam: _categoryTree[i].name_param });
    }
  }
  return tree;
};

CategoryStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case categoryConstants.CATEGORY_TREE_RECEIVED:
      _categoryTree = payload.categoryTree;
      CategoryStore.__emitChange();
      break;
  }
};

module.exports = CategoryStore;
