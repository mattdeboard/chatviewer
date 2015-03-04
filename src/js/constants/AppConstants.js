var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
    ADD_TOPIC: null,
    ADD_PARTICIPANT: null,
    SEARCH: null,
    CLEAR_SEARCH: null,
    FETCH_TOPIC: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  FIREBASE_URL: "https://interview-bolster.firebaseio.com/"

};
