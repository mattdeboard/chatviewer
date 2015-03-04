const React = require('react');
const Router = require('react-router');
const App = require('./components/App.jsx');
const routes = require('./routers/app_router.jsx');

// App.fetchData();

Router.run(routes, function (Handler, state) {
  // topicID will either be got from the path, or it will be `false`.
  // ("not not undefined" is "false").
  const topicID = state.params.topicID || !!state.params.topicID
  React.render(<Handler topicID={topicID} />, document.getElementById('main'));
})
