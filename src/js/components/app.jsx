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

  render: function() {
    return (
      <div className="app container">
        <Header />
        <SearchBox />
      </div>
    );
  }
});

module.exports = App;
