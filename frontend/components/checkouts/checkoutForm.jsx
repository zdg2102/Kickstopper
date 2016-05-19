// form for completing checkouts to make pledges

var React = require('react');
var ApiUtil = require('../../utils/apiUtil');

var CheckoutForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      name: "",
      cardNumber: "",
      cvn: "",
      expirationMonth: "",
      expirationYear: "",
      country: "",
      postalCode: "",
      nameError: false,
      cardNumberError: false,
      cvnError: false,
      expirationMonthError: false,
      expirationYearError: false,
      countryError: false,
      postalCodeError: false,
      errorMessages: []
    };
  },

  handleFieldInput: function (fieldName, e) {
    var newState = {};
    newState[fieldName] = e.currentTarget.value;
    newState[fieldName + "Error"] = false;
    newState.errorMessages = [];
    this.setState(newState);
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var newState = {};
    newState.errorMessages = [];
    if (this.state.name.length === 0) {
      newState.nameError = true;
      newState.errorMessages.push("Name missing");
    }
    if (this.state.cardNumber.length === 0) {
      newState.cardNumberError = true;
      newState.errorMessages.push("Card number missing");
    }
    if (this.state.cvn.length === 0) {
      newState.cvnError = true;
      newState.errorMessages.push("CVN missing");
    }
    if (this.state.expirationMonth.length === 0) {
      newState.expirationMonthError = true;
      newState.errorMessages.push("Expiration month not selected");
    }
    if (this.state.expirationYear.length === 0) {
      newState.expirationYearError = true;
      newState.errorMessages.push("Expiration year not selected");
    }
    if (this.state.country.length === 0) {
      newState.countryError = true;
      newState.errorMessages.push("Country missing");
    }
    if (this.state.postalCode.length === 0) {
      newState.postalCodeError = true;
      newState.errorMessages.push("Postal code missing");
    }

    if (newState.errorMessages.length > 0) {
      this.setState(newState);
    } else {
      this.submitStripeRequest();
    }
  },

  populate: function (e) {
    e.preventDefault();
    this.setState({
      name: "Steve Sample",
      cardNumber: "4242424242424242",
      expirationMonth: "01",
      expirationYear: new Date().getFullYear() + 5,
      cvn: "123",
      country: "United States",
      postalCode: "12345"
    });
  },

  submitStripeRequest: function () {
    var card = {
      number: this.state.cardNumber,
      cvc: this.state.cvn,
      exp_month: this.state.expirationMonth,
      exp_year: this.state.expirationYear
    };
    Stripe.card.createToken(card, function (status, response) {
      if (status !== 200) {
        this.setState({ errorMessages: ["Card invalid. Please check" +
          " card number, CVN, and expiration date."]});
      } else {
        ApiUtil.createPledgeFromCheckout(
          this.props.checkout.id,
          response.id,
          function () {
            this.context.router.push("/checkouts/" + this.props.checkout.id +
            "/completed");
          }.bind(this),
          function () {
            this.setState({ errorMessages: ["Error processing request." +
              " Please try again."]});
          }.bind(this)
        );
      }
    }.bind(this));
  },

  render: function () {
    var nameError, cardNumberError, cvnError, expirationMonthError,
      expirationYearError, countryError, postalCodeError;
    nameError = this.state.nameError ? " error" : "";
    cardNumberError = this.state.cardNumberError ? " error" : "";
    cvnError = this.state.cvnError ? " error" : "";
    expirationMonthError = this.state.expirationMonthError ? " error" : "";
    expirationYearError = this.state.expirationYearError ? " error" : "";
    countryError = this.state.countryError ? " error" : "";
    postalCodeError = this.state.postalCodeError ? " error" : "";

    var errorList;
    if (this.state.errorMessages.length > 0) {
      errorList = this.state.errorMessages.map( function (error, idx) {
        return <span key={idx} className="checkout-error">{error}</span>;
      });
    }

    var monthOptions = ["01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12"].map(function (num) {
      return <option key={num} value={num}>{num}</option>
    });

    var yearOptions = [];
    var thisYear = new Date().getFullYear();
    for (var i = 0; i < 20; i++) {
      yearOptions.push(thisYear + i);
    }
    yearOptions = yearOptions.map(function (year) {
      return <option key={year} value={year}>{year}</option>
    });

    return (
      <form className="checkout-form" onSubmit={this.handleSubmit}>

        <p className="checkout-form-info">
          Or you can use the below button to populate the form
          for you:
        </p>

        <button className="checkout-populate" onClick={this.populate}>
          Populate Sample Checkout Data
        </button>

        {errorList}

        <h4 className="checkout-form-header form-first">
          {"Card information"}
        </h4>

        <div className="group">
          <label htmlFor="checkoutName" className="checkout-form-label">
            {"Name"}
          </label>
          <input type="text" id="checkoutName"
            className={"checkout-form-input checkout-name" + nameError}
            value={this.state.name} placeholder={"Name"}
            onChange={this.handleFieldInput.bind(this, "name")} />
        </div>

        <div className="group">
          <label htmlFor="cardNumber" className="checkout-form-label">
            {"Card number"}
          </label>
          <input type="text" id="cardNumber"
            className={"checkout-form-input checkout-card-number" +
            cardNumberError}
            value={this.state.cardNumber} placeholder={"Card number"}
            onChange={this.handleFieldInput.bind(this, "cardNumber")} />
        </div>

        <div className="group">
          <label htmlFor="expirationMonth" className="checkout-form-label">
            {"Expiration"}
          </label>
          <select id="expirationMonth" value={this.state.expirationMonth}
            className={"checkout-form-select" + expirationMonthError}
            onChange={this.handleFieldInput.bind(this, "expirationMonth")}>
            <option value="">{""}</option>
            {monthOptions}
          </select>
          <select id="expirationYear" value={this.state.expirationYear}
            className={"checkout-form-select" + expirationYearError}
            onChange={this.handleFieldInput.bind(this, "expirationYear")}>
            <option value="">{""}</option>
            {yearOptions}
          </select>
        </div>

        <div className="group">
          <label htmlFor="cvn" className="checkout-form-label">
            {"CVN"}
          </label>
          <input type="text" id="cvn"
            className={"checkout-form-input checkout-cvn" + cvnError}
            value={this.state.cvn} placeholder={"CVN"}
            onChange={this.handleFieldInput.bind(this, "cvn")} />
        </div>


        <h4 className="checkout-form-header">
          {"Billing address"}
        </h4>

        <div className="group">
          <label htmlFor="country" className="checkout-form-label">
            {"Country"}
          </label>
          <input type="text" id="country"
            className={"checkout-form-input checkout-country" + countryError}
            value={this.state.country} placeholder={"Country"}
            onChange={this.handleFieldInput.bind(this, "country")} />
        </div>

        <div className="group">
          <label htmlFor="postalCode" className="checkout-form-label">
            {"Postal code"}
          </label>
          <input type="text" id="postalCode"
            className={"checkout-form-input checkout-postal-code" +
            postalCodeError}
            value={this.state.postalCode} placeholder={"Postal code"}
            onChange={this.handleFieldInput.bind(this, "postalCode")} />
        </div>

        <input type="submit" className="checkout-submit"
          value="Pledge" />

      </form>
		);
	}
});

module.exports = CheckoutForm;
