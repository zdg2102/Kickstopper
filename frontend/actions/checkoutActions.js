var checkoutConstants = require('../constants/checkoutConstants');
var AppDispatcher = require('../dispatcher/dispatcher');

var CheckoutActions = {
  receiveCheckout: function (checkout) {
		var action = {
			actionType: checkoutConstants.CHECKOUT_RECEIVED,
			checkout: checkout
		};
		AppDispatcher.dispatch(action);
	}
};

module.exports = CheckoutActions;
