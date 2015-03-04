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

const setStateFromFetched = function(props) {
  const topic = TopicStore.getTopicById(props.topicID);
  if (topic) {
    var topicName = topic.name;
  } else {
    var topicName = null;
  }
  setFetchedTopic(props.topicID, topicName);
};

const handler = function(func) {
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
    fetchTopics: function(topicID) {
      var topics = new Firebase(Constants.FIREBASE_URL).child("topics");

      if (topicID) {
        topics = topics.orderByKey().equalTo(topicID);
        var callback = handler(setFetchedTopic);
      } else {
        var callback = handler(addTopic);
      };

      topics.on("child_added", callback);
    },

    fetchParticipants: function() {
      var participants = new Firebase(Constants.FIREBASE_URL)
        .child("participants");
      participants.on("child_added", handler(addParticipant));
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
    /**
      After the initial rendering, when this component receives properties,
      there are two possible results:

        1. `this.props.topicID` is false. In this case, we are looking at the
           root route. We can just pull the topics from the store.

        2. `this.props.topicID` is a numeric string. In this case, the user has
           selected a particular topic to view. Since one of the conditions in
           this exercise is that we must contact Firebase for this, the
           "fluxiest" way to do this is for the view to generate an action.
           The dispatcher dispatches this action to the stores. In this case,
           the action is handled by TopicStore. TopicStore then uses the
           Firebase library to query the data store.

    */
    if (!nextProps.topicID) {
      if (!this.state.fullRetrievalComplete) {
        App.fetchTopics();
      } else {
        this.setState({topics: TopicStore.getAll()});
      }
    } else {
      setStateFromFetched(nextProps);
    }
  },

  componentWillMount: function() {
    if (!this.props.topicID) {
      App.fetchTopics();
    } else {
      setStateFromFetched(this.props);
    };
    App.fetchParticipants();

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
