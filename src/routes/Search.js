/* eslint-disable react/prop-types */

import querystring from 'querystring'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import PageTitle from 'components/PageTitle'
import SearchResults from 'components/SearchResults'
import SearchError from 'components/SearchError'
import LoadingSpinner from 'components/utils/LoadingSpinner'
import NoResults from 'components/NoResults'
import connectStore from 'modules/connectStore'
import { siteName, description, protocol, domain } from '../../config/settings'

@connectStore()
export default class Search extends Component {
  getSearchQuery(search) {
    return querystring.parse(
      search.slice(1),
      null,
      null,
      { decodeURIComponent: a => a }
    ).q || ''
  }
  get q() {
    return this.getSearchQuery(this.props.location.search)
  }
  get decodedQ() {
    return decodeURIComponent(this.q)
  }
  componentDidMount() {
    if (this.q) {
      this.props.actions.searchArticle(this.q)
    }
  }
  componentDidUpdate(prevProps) {
    const prevQ = this.getSearchQuery(prevProps.location.search)
    if (this.q !== prevQ) {
      this.props.actions.searchArticle(this.q)
    }
  }
  renderMain() {
    const { searchResults } = this.props
    if (searchResults.isFetching) {
      return <LoadingSpinner />
    }
    if (searchResults.error) {
      return <SearchError error={searchResults.error} />
    }
    if (searchResults.items.length > 0) {
      return <SearchResults items={searchResults.items} />
    }
    return <NoResults />
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>{`${this.decodedQ} | Search`}</title>
          <meta name='title' content={`${this.decodedQ} | Search | ${siteName}`} />
          <meta name='description' content={`Search | ${this.decodedQ} | ${description}`} />
          <meta property='og:title' content={`${this.decodedQ} | Search | ${siteName}`} />
          <meta property='og:description' content={`Search | ${this.decodedQ} | ${description}`} />
          <meta property='og:url' content={`${protocol}//${domain}/search/?q=${this.q}`} />
        </Helmet>
        <PageTitle title={`Search result "${this.decodedQ}"`} />
        {this.renderMain()}
      </div>
    )
  }
}
