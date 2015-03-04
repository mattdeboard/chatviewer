const React = require('react');
const _ = require('underscore');

const TopicPalette = React.createClass({
  propTypes: {
    numTopics: React.PropTypes.number
  },

  getInitialState: function() {
    return {
      hidden: []
    };
  },

  handleClick: function(e) {
    return;
  },

  handleKeyPress: function(e) {
    if (["Space", "Enter"].indexOf(e.key) !== -1) {
      return this.handleClick(e);
    }
  },

  renderTopicLinks: function() {
    return _.range(this.props.numTopics).map(function(i, idx) {
      return (
        <button className="btn btn-default"
                tabIndex={i + 1}
                key={"topic-link-button-" + i}
                onClick={this.handleClick}
                onKeyUp={this.handleKeyPress}
                onKeyDown={this.handleKeyPress}>
          Topic {i}
        </button>
      );
    }, this);
  },

  render: function() {
    return (
      <div className="palette" id="topic-palette">
        {this.renderTopicLinks()}
      </div>
    );
  }

});

module.exports = TopicPalette;
