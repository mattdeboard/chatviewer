const React = require('react');
const {searchNotes, clearSearch} = require('../actions/DataActionCreators');

const SearchBox = React.createClass({
  propTypes: {
    onSearchBoxSubmit: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      searchText: ""
    }
  },

  handleChange: function (e) {
    const query = e.target.value;
    this.setState({searchText: query});
    if (query.length >= 2) {
      searchNotes(query);
    } else {
      clearSearch();
    }
  },

  handleFormSubmit: function (e) {
    e.preventDefault();
    e.stopPropagation();
  },

  renderForm: function () {

    return (
      <form id="search-form"
            name=""
            action=""
            onSubmit={this.handleFormSubmit}>
        <fieldset>
          <legend className="aural">
            Search Form
          </legend>

          <label htmlFor="search"
                 className="aural"
                 aria-hidden="true">
            Search
          </label>

          <input type="text"
                 id="search"
                 value={this.state.searchText}
                 title="Search"
                 className="form-control"
                 name="search_text"
                 placeholder="Search"
                 role="button"
                 aria-label="Search"
                 onChange={this.handleChange}
                 tabIndex="1" />

          <button type="submit" tabIndex="-1">
            <i className="fa fa-search">
              <span className="aural">Submit</span>
            </i>
          </button>
        </fieldset>
      </form>
    );
  },

  render: function () {
    return (
      <div className="search-container">
        {this.renderForm()}
      </div>
    );
  }
});

module.exports = SearchBox;
