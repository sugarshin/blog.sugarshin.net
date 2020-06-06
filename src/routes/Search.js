/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import queryString from 'query-string'
import PageTitle from 'components/PageTitle'
import SearchResults from 'components/SearchResults'
import LoadingSpinner from 'components/utils/LoadingSpinner'
import NoResults from 'components/NoResults'
import connectStore from 'modules/connectStore'
import { siteName, description, protocol, domain } from '../../config/settings'

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
  componentDidUpdate({ location: { search: prevSearch } }) {
    const prevQ = this.parseQuery(prevSearch)
    if (this.q !== prevQ) {
      this.props.actions.searchArticle(this.q)
    }
  }
  render() {
    const { searchResults } = this.props
    return (
      <div>
        <Helmet>
          <title>{`${this.q} | Search`}</title>
          <meta name='title' content={`${this.q} | Search | ${siteName}`} />
          <meta name='description' content={`Search | ${this.q} | ${description}`} />
          <meta property='og:title' content={`${this.q} | Search | ${siteName}`} />
          <meta property='og:description' content={`Search | ${this.q} | ${description}`} />
          <meta property='og:url' content={`${protocol}//${domain}/search/?q=${this.q}`} />
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
