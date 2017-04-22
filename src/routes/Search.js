/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import queryString from 'query-string'
import PageTitle from 'components/PageTitle'
import SearchResults from 'components/SearchResults'
import LoadingSpinner from 'components/utils/LoadingSpinner'
import NoResults from 'components/NoResults'
import connectStore from 'modules/connectStore'

@connectStore()
export default class Search extends Component {
  parseQuery(search) {
    return queryString.parse(search).q || ''
  }
  get q() {
    return this.parseQuery(this.props.location.search)
  }
  componentDidMount() {
    if (this.q) {
      this.props.actions.searchArticle(this.q)
    }
  }
  componentWillReceiveProps({ location: { search } }) {
    const q = this.parseQuery(search)
    if (this.q !== q) {
      this.props.actions.searchArticle(q)
    }
  }
  render() {
    const { searchResults } = this.props
    return (
      <div>
        <Helmet>
          <title>{`${this.q} | Search`}</title>
        </Helmet>
        <PageTitle title={`Search result "${this.q}"`} />
        {searchResults.isFetching ? <LoadingSpinner /> : (
          searchResults.items.length > 0 ? (
            <SearchResults items={searchResults.items} />
          ) : <NoResults />
        )}
      </div>
    )
  }
}
