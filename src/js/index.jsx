const React = require('react');
const Router = require('react-router');
const App = require('./components/App.jsx');
const routes = require('./routers/app_router.jsx');

App.fetchData();

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('main'));
})
