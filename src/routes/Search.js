import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PageTitle from 'components/PageTitle';
import SearchResults from 'components/SearchResults';
import LoadingSpinner from 'components/LoadingSpinner';
import NoResults from 'components/NoResults';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { actions, location } = this.props;
    if (location.query.q) {
      actions.searchArticle(location.query.q);
    }
  }
  componentWillReceiveProps({ location: { query: { q } } }) {
    const { actions, location } = this.props;
    if (q && q !== location.query.q) {
      actions.searchArticle(q);
    }
  }
  render() {
    const { searchResults, location: { query: { q } } } = this.props;
    return (
      <div>
        <Helmet title={`${q} | Search`} />
        <PageTitle title={`Search result "${q}"`} />
        {searchResults.isFetching ? <LoadingSpinner /> : (
          searchResults.items.length > 0 ? (
            <SearchResults items={searchResults.items} />
          ) : <NoResults />
        )}
      </div>
    );
  }
}
