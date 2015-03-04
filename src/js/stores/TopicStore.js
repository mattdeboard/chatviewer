const AppDispatcher = require('../dispatchers/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const Constants = require('../constants/AppConstants');
const assign = require('object-assign');
const lunr = require('lunr');
const _ = require('underscore');

var storage = {
  all: {},
  searchResults: {}
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

window.searchNotes = searchNotes;
window.appStorage = storage;

const TopicStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _.extend({}, storage.all);
  },

  getTopicById: function(id) {
    return storage.all[id];
  },

  getSearchResults: function() {
    return _.extend({}, storage.searchResults);
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
    };
  })
});

module.exports = TopicStore;
