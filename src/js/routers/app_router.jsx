const React = require('react');
const {Route} = require('react-router');
const App = require('../components/app.jsx');

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="topic" path="topic/:topicID" handler={App} />
  </Route>
);

module.exports = routes;
