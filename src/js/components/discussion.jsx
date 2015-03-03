const React = require('react');

const Quote = React.createClass({
  propTypes: {
    avatarUrl: React.PropTypes.string.isRequired,
    quoteText: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <span className="quote">
        <img src={this.props.avatarUrl} />
        <p>
          {this.props.quoteText}
        </p>
      </span>
    );
  }
});

// A single discussion component contains all the exchanges for a particular
//  topic.
const Discussion = React.createClass({
  propTypes: {
    quotes: React.PropTypes.arrayOf({
      React.PropTypes.shape({
        text: React.PropTypes.string,
        speaker: React.PropTypes.number
      })
    })
  },

  getAvatarFromStore: function(speakerId) {
    return "";
  }

  renderQuotes: function() {
    return this.props.quotes.map(function(quote) {
      return (
        <Quote avatarUrl={this.getAvatarFromStore(quote.speaker)}
               quoteText={quote.text} />
      );
    });
  }

  render: function() {
    return (
      <div className="discussion">
        {this.renderQuotes()}
      </div>
    );
  }
});

module.exports = Discussion;
