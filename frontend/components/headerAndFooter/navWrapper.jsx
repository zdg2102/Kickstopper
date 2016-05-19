// Navigational header and footer for all pages except project creation and
// pledge pages

var React = require('react');
var NavHeader = require('./navHeader');
var NavFooter = require('./navFooter');

var NavWrapper = React.createClass({

  render: function () {
    return (
      <div>
        <NavHeader />
        {this.props.children}
        <NavFooter />
      </div>
    );
  }

});

module.exports = NavWrapper;
