const React = require('react');
const App = require('./components/App.jsx');

App.fetchData();
React.render(<App />, document.getElementById('main'));
