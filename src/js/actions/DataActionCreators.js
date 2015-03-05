var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  addTopic: function(id, topic) {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.ADD_TOPIC,
      id: id,
      topic: topic
    });
  },

  addParticipant: function(id, participant) {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.ADD_PARTICIPANT,
      id: id,
      participant: participant
    });
  },

  searchNotes: function(topicID, query) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.SEARCH,
      id: topicID,
      query: query
    });
  },

  clearSearch: function() {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.CLEAR_SEARCH
    });
  },

  setFetchedTopic: function(id) {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.FETCH_TOPIC,
      id: id
    });
  }
};
