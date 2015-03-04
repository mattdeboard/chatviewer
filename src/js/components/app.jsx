const DiscussionDisplay = require('./discussion_display.jsx');
const Header = require('./header.jsx');
const React = require('react');
const SearchBox = require('./searchbox.jsx');
const TopicPalette = require('./topic_palette.jsx');
const ParticipantStore = require('../stores/ParticipantStore');
const TopicStore = require('../stores/TopicStore');
const Firebase = require('firebase');
const Constants = require('../constants/AppConstants');
const {addTopic, addParticipant} = require('../actions/DataActionCreators');

const App = React.createClass({
  statics: {
    fetchData: function() {
      const storeTypes = {
        participants: addParticipant,
        topics: addTopic,
      }
      for (let store in storeTypes) {
        let child = new Firebase(Constants.FIREBASE_URL).child(store);
        let handler = storeTypes[store];
        child.on("child_added", function(childSnapshot, prevChildName) {
          handler(childSnapshot.key(), childSnapshot.val());
        });
      }
    },
  },

  getInitialState: function() {
    return {
      topics: {},
      participants: {}
    };
  },

  componentWillMount: function() {
    TopicStore.addChangeListener(this.handleTopicChange);
    ParticipantStore.addChangeListener(this.handleParticipantChange);
  },

  componentWillUnmount: function() {
    TopicStore.removeChangeListener(this.handleTopicChange);
    ParticipantStore.removeChangeListener(this.handleParticipantChange);
  },

  handleTopicChange: function() {
    this.setState({topics: TopicStore.getAll()});
  },

  handleParticipantChange: function() {
    this.setState({participants: ParticipantStore.getAll()})
  },

  render: function() {
    console.log(this.state.topics);
    return (
      <div className="app container">
        <Header />
        <SearchBox />
        <TopicPalette topics={this.state.topics} />
        <DiscussionDisplay topics={this.state.topics}
                           participants={this.state.participants} />
      </div>
    );
  }
});

module.exports = App;
