const React = require('react');
const _ = require('underscore');
const {flattenTopics} = require('./utils');
const TopicStore = require('../stores/TopicStore');

const TopicPalette = React.createClass({
  propTypes: {
    topics: React.PropTypes.object,
    selectedTopic: React.PropTypes.bool
  },

  renderTopicLinks: function() {
    const topics = flattenTopics(this.props.topics);

    return topics.map(function(topic, idx) {
      let path = "#/topic/" + idx;
      let linkText = topic.name;

      // If we're looking at only a single topic the user has selected, the
      // button should take us back to all notes.
      if (this.props.selectedTopic) {
        path = "#/";
        linkText = "Show All";
      };

      return (
        <a href={path}
           className="btn btn-default"
           tabIndex={idx + 1}
           key={"topic-" + topic.name}
           role="link">
          {linkText}
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
