const React = require('react');
const _ = require('underscore');
const TopicStore = require('../stores/TopicStore');

const TopicPalette = React.createClass({
  propTypes: {
    topics: React.PropTypes.object
  },

  transformTopics: function() {
    var topics = [];

    for (let key in this.props.topics) {
      let topic = this.props.topics[key];
      topics.push({
        id: key,
        discussion: topic.discussion,
        name: topic.name
      });
    }
    return topics;
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
    const topics = this.transformTopics();
    return topics.map(function(topic, idx) {
      return (
        <button className="btn btn-default"
                tabIndex={idx + 1}
                key={"topic-" + topic.name}
                onClick={this.handleClick}
                onKeyUp={this.handleKeyPress}
                onKeyDown={this.handleKeyPress}>
          {topic.name}
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
