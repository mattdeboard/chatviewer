const React = require('react');
const _ = require('underscore');
const {flattenTopics} = require('./utils');
const TopicStore = require('../stores/TopicStore');

const TopicPalette = React.createClass({
  propTypes: {
    topics: React.PropTypes.object
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
    const topics = flattenTopics(this.props.topics);
    return topics.map(function(topic, idx) {
      return (
        <a href={"#/topic/" + idx}
           className="btn btn-default"
           tabIndex={idx + 1}
           key={"topic-" + topic.name}
           role="link">
          {topic.name}
        </a>
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
