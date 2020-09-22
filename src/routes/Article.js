/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import isEqual from 'lodash/isEqual'
import PageTitle from 'components/PageTitle'
import ArticleComponent from 'components/Article'
import NotFoundComponent from 'components/NotFound'
import LoadingSpinner from 'components/utils/LoadingSpinner'
import connectStore from 'modules/connectStore'
import { siteName } from '../../config/settings'

@connectStore()
export default class Article extends Component {
  componentDidMount() {
    this.fetchArticle(this.props.match.params)
  }
  componentDidUpdate(prevProps) {
    const { match: { params: currentParams } } = this.props
    if (!isEqual(prevProps.match.params, currentParams)) {
      this.fetchArticle(currentParams)
    }
  }
  render() {
    const { location, article } = this.props

    return (
      <div>
        <Helmet>
          <title>{article.title}</title>
          <meta name='title' content={`${article.title} | ${siteName}`} />
          <meta name='description' content={article.description} />
          <meta property='og:title' content={article.title} />
          <meta property='og:description' content={article.description} />
          <meta property='og:type' content={article.pageType} />
          <meta property='og:image' content={article.ogImageURL} />
          <meta property='og:url' content={article.publicURL} />
        </Helmet>
        <PageTitle title={article.title} />
        {article.markdown ? (
          <ArticleComponent article={article} currentPathname={location.pathname} baseShareMessage={siteName} />
        ) : article.error && article.error.status === 404 ? (
          <NotFoundComponent />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    )
  }
  fetchArticle(params) {
    const { year, month, day, title } = params
    this.props.actions.fetchArticle(`${year}-${month}-${day}_${title}.md`)
  }
}
