const AppDispatcher = require('../dispatchers/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const Constants = require('../constants/AppConstants');
const assign = require('object-assign');

// data storage
var storage = {}

var storeParticipant = function(id, data) {
  storage[id] = data;
}

const ParticipantStore = assign({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getAll: function() {
    return storage;
  },

  getForID: function(id) {
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

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    const action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.ADD_PARTICIPANT:
        storeParticipant(action.id, action.participant);
        ParticipantStore.emitChange();
        break;
    }
  })

});

module.exports = ParticipantStore;
