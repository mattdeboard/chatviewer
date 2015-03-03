const React = require('react');
const Discussion = require('./discussion.jsx');

const Topic = React.createClass({
  propTypes: {
    discussion: React.PropTypes.arrayOf(
      React.PropTypes.shape(Discussion.propTypes)
    ).isRequired,
    name: React.PropTypes.string.isRequired,
    topicId: React.PropTypes.number.isRequired
  },

  renderDiscussions: function() {
    return this.props.discussion.map(function(d) {
      return (
        <Discussion {...d} />
      );
    });
  },

  render: function() {
    return (
      <div className="topic" id={"topic-" + topicId}>
        <h2>
          {this.props.name}
        </h2>
        {this.renderDiscussions()}
      </div>
    );
  }
});

module.exports = Topic;
