var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  addTopic: function(name, discussion) {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.ADD_TOPIC,
      name: name,
      discussion: discussion
    });
  },

  addParticipant: function(id, participant) {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.ADD_PARTICIPANT,
      id: id,
      participant: participant
    });
  },
};
