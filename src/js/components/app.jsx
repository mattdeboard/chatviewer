const DiscussionDisplay = require('./discussion_display.jsx');
const Header = require('./header.jsx');
const React = require('react');
const SearchBox = require('./searchbox.jsx');
const TopicPalette = require('./topic_palette.jsx');

const App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <Header />
        <SearchBox />
        <TopicPalette />
        <DiscussionDisplay />
      </div>
    );
  }
});

module.exports = App;
