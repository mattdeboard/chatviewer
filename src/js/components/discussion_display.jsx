const React = require('react');
const {flattenTopics} = require('./utils');
const TopicStore = require('../stores/TopicStore');
const Discussion = require('./discussion.jsx');

const DiscussionDisplay = React.createClass({
  propTypes: {
    topics: React.PropTypes.object,
    participants: React.PropTypes.object
  },

  renderDiscussions: function() {
    return flattenTopics(this.props.topics).map(function(topic) {
      return (
        <section className="topic-discussion" id={"topic-discussion-" + topic.id}>
          <h3>
            {topic.name}
          </h3>
          <Discussion quotes={topic.discussion}
                      participants={this.props.participants} />
        </section>
      );
    }, this);
  },

  render: function() {
    return (
      <div className="discussion-display">
        {this.renderDiscussions()}
      </div>
    );
  }

});

module.exports = DiscussionDisplay;
