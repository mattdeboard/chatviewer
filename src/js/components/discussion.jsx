const React = require('react');

const Quote = React.createClass({
  propTypes: {
    avatarUrl: React.PropTypes.string.isRequired,
    quoteText: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <div className="quote row">
        <div className="col-xs-2">
          <img src={this.props.avatarUrl}
               width={125}
               height={125}
               className="center panel panel-body" />
        </div>
        <div className="col-xs-10">
          <p>
            {this.props.quoteText}
          </p>
        </div>
      </div>
    );
  }
});

// A single discussion component contains all the exchanges for a particular
//  topic.
const Discussion = React.createClass({
  propTypes: {
    quotes: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        text: React.PropTypes.string,
        speaker: React.PropTypes.number
      })
    ),
    participants: React.PropTypes.object,
  },

  getAvatarForParticipantID: function(id) {
    return this.props.participants[id.toString()].avatar;
  },

  renderQuotes: function() {
    return this.props.quotes.map(function(quote) {
      return (
        <Quote avatarUrl={this.getAvatarForParticipantID(quote.speaker)}
               quoteText={quote.text} />
      );
    }, this);
  },

  render: function() {
    return (
      <div className="discussion">
        {this.renderQuotes()}
      </div>
    );
  }
});

module.exports = Discussion;
