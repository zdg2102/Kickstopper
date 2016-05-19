var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var checkoutConstants = require('../constants/checkoutConstants');

var CheckoutStore = new Store(AppDispatcher);

var _currentCheckout = null;

CheckoutStore.currentCheckout = function () {
  var checkoutCopy = {};
  if (_currentCheckout) {
    for (var id in _currentCheckout) {
      if (_currentCheckout.hasOwnProperty(id)) {
        checkoutCopy[id] = _currentCheckout[id];
      }
    }
  } else {
    checkoutCopy = null;
  }
  return checkoutCopy;
};

CheckoutStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case checkoutConstants.CHECKOUT_RECEIVED:
      _currentCheckout = payload.checkout;
      CheckoutStore.__emitChange();
      break;
  }
};

module.exports = CheckoutStore;
