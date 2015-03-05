const DiscussionDisplay = require('./discussion_display.jsx');
const Header = require('./header.jsx');
const React = require('react');
const SearchBox = require('./searchbox.jsx');
const TopicPalette = require('./topic_palette.jsx');
const ParticipantStore = require('../stores/ParticipantStore');
const TopicStore = require('../stores/TopicStore');
const Firebase = require('firebase');
const Constants = require('../constants/AppConstants');
const Router = require('react-router');
const _ = require('underscore');
const {addTopic, addParticipant, setFetchedTopic} =
  require('../actions/DataActionCreators');

const createOnChildAddedHandler = function(func) {
  return function (childSnapshot, prevChildName) {
    func(childSnapshot.key(), childSnapshot.val());
  };
};

const App = React.createClass({
  propTypes: {
    topicID: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ])
  },

  mixins: [
    Router.State
  ],

  statics: {
    fetchData: function(topicID) {
      App.fetchTopics(topicID);
      App.fetchParticipants();
    },

    fetchTopics: function(topicID) {
      var topics = new Firebase(Constants.FIREBASE_URL).child("topics");
      topics.on("child_added", createOnChildAddedHandler(addTopic));

      if (topicID) {
        topics.orderByKey().equalTo(topicID)
          .on("child_added", createOnChildAddedHandler(setFetchedTopic));
      };
    },

    fetchParticipants: function() {
      var participants = new Firebase(Constants.FIREBASE_URL)
        .child("participants")
        .on("child_added", createOnChildAddedHandler(addParticipant));
    },
  },

  getInitialState: function() {
    return {
      topics: {},
      participants: {},
      fullRetrievalComplete: false,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    // If and only if we already have all data stored AND we're not trying to
    // get to a view for a particular topic do we just setState from TopicStore.
    if (this.state.fullRetrievalComplete && !nextProps.topicID) {
      this.setState({topics: TopicStore.getAll()});
    } else {
      App.fetchTopics(nextProps.topicID);
    };
  },

  componentWillMount: function() {
    App.fetchData(this.props.topicID);
    TopicStore.addChangeListener(this.handleTopicChange);
    TopicStore.addSearchListener(this.handleSearchResults);
    TopicStore.addFetchListener(this.handleFetchResults);
    ParticipantStore.addChangeListener(this.handleParticipantChange);
  },

  componentWillUnmount: function() {
    TopicStore.removeChangeListener(this.handleTopicChange);
    TopicStore.removeSearchListener(this.handleSearchResults);
    TopicStore.removeFetchListener(this.handleFetchResults);
    ParticipantStore.removeChangeListener(this.handleParticipantChange);
  },

  handleTopicChange: function() {
    this.setState({topics: TopicStore.getAll(), fullRetrievalComplete: true});
  },

  handleSearchResults: function() {
    this.setState({topics: TopicStore.getSearchResults()});
  },

  handleFetchResults: function() {
    this.setState({topics: TopicStore.getFetchedTopic()});
  },

  handleParticipantChange: function() {
    this.setState({participants: ParticipantStore.getAll()})
  },

  render: function() {
    return (
      <div className="app container">
        <Header />
        <SearchBox />
        <TopicPalette topics={this.state.topics}
                      selectedTopic={!!this.props.topicID} />
        <DiscussionDisplay topics={this.state.topics}
                           participants={this.state.participants} />
      </div>
    );
  }
});

module.exports = App;
