/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import isEqual from 'lodash/isEqual'
import PageTitle from 'components/PageTitle'
import ArticleComponent from 'components/Article'
import LoadingSpinner from 'components/utils/LoadingSpinner'
import connectStore from 'modules/connectStore'
import { siteName } from '../../config/settings'

@connectStore()
export default class Article extends Component {
  componentDidMount() {
    this.fetchArticle(this.props.match.params)
  }
  UNSAFE_componentWillReceiveProps({ match: { params } }) {
    if (!isEqual(this.props.match.params, params)) {
      this.fetchArticle(params)
    }
  }
  render() {
    const { location, article } = this.props
    return (
      <div>
        <Helmet>
          <title>{article.title}</title>
        </Helmet>
        <PageTitle title={article.title} />
        {article.markdown ? (
          <ArticleComponent article={article} currentPathname={location.pathname} baseShareMessage={siteName} />
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
