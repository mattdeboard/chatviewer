const React = require('react');

const Header  = React.createClass({
  render: function() {
    return (
      <div className="row" id="page-header">
        <h1>
          A Discussion With Tim Cook
        </h1>
      </div>
    );
  }
});

module.exports = Header;
