const AppDispatcher = require('../dispatchers/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const Constants = require('../constants/AppConstants');
const assign = require('object-assign');

var storage = {};

const storeTopic = function(id, topic) {
  console.log(topic);
  storage[id] = topic;
}

const TopicStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return storage;
  },

  getTopicById: function(id) {
    return storage[id];
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

  dispatcherIndex: AppDispatcher.register(function(payload) {
    const action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.ADD_TOPIC:
        storeTopic(action.id, action.topic);
        TopicStore.emitChange();
        break;
    };
  })
});

module.exports = TopicStore;
