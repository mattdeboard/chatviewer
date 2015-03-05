const AppDispatcher = require('../dispatchers/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const Constants = require('../constants/AppConstants');
const assign = require('object-assign');
const lunr = require('lunr');
const _ = require('underscore');
const Firebase = require('firebase');

var storage = {
  all: {},
  searchResults: {},
  fetched: {}
};

const storeTopic = function(id, topic) {
  storage.all[id] = topic;
}

const searchIndex = lunr(function () {
  this.field("text")
  this.field("speaker")
  this.field("topicID")
  this.ref("id", false)
});

const addTopicToIndex = function(id, topic) {
  topic.discussion.map(function(note, idx) {
    searchIndex.add({
      text: note.text,
      speaker: note.speaker,
      topicID: id,
      id: JSON.stringify({index: idx, topicID: id})
    });
  });
};

const searchNotes = function(query) {
  const results = searchIndex.search(query);
  let resultsByTopic = {};

  for (let result of results) {
    let note = JSON.parse(result.ref);
    let topic = TopicStore.getTopicById(note.topicID);

    if (_.has(resultsByTopic, note.topicID)) {
      resultsByTopic[note.topicID].discussion
        .push(topic.discussion[note.index]);
    } else {
      resultsByTopic[note.topicID] = {
        discussion: [topic.discussion[note.index]],
        name: topic.name
      }
    };
  }

  return resultsByTopic;
};

const replaceSearchResults = function(results) {
  storage.searchResults = results;
};

const replaceFetched = function(id, topic) {
  storage.fetched = {
    [ id ]: topic
  };
};

const TopicStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _.extend({}, storage.all);
  },

  getTopicById: function(id) {
    return storage.all[id] || null;
  },

  getSearchResults: function() {
    return _.extend({}, storage.searchResults);
  },

  getFetchedTopic: function() {
    return _.extend({}, storage.fetched);
  },

  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  addSearchListener: function(callback) {
    this.on("search", callback);
  },

  removeSearchListener: function(callback) {
    this.removeListener("search", callback);
  },

  emitSearch: function() {
    this.emit("search");
  },

  addFetchListener: function(callback) {
    this.on("fetch", callback);
  },

  removeFetchListener: function(callback) {
    this.removeListener("fetch", callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    const action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.ADD_TOPIC:
        storeTopic(action.id, action.topic);
        addTopicToIndex(action.id, action.topic);
        TopicStore.emitChange();
        break;
      case Constants.ActionTypes.SEARCH:
        const results = searchNotes(action.query);
        replaceSearchResults(results);
        TopicStore.emitSearch();
        break;
      case Constants.ActionTypes.CLEAR_SEARCH:
        replaceSearchResults({});
        TopicStore.emitChange();
        break;
      case Constants.ActionTypes.FETCH_TOPIC:
        var topics = new Firebase(Constants.FIREBASE_URL).child("topics")
          .orderByKey()
          .equalTo(action.id)
          .on("child_added", function(childSnapshot, prevChildName) {
            const key = childSnapshot.key();
            const val = childSnapshot.val();
            replaceFetched(key, val);
            TopicStore.emit('fetch');;
          });
        break;
    };
  })
});

module.exports = TopicStore;
