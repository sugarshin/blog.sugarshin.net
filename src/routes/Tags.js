/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PageTitle from 'components/PageTitle'
import Articles from 'components/Articles'
import connectStore from 'modules/connectStore'
import { siteName, description, protocol, domain } from '../../config/settings'

@connectStore()
export default class Tags extends Component {
  render() {
    const { tag } = this.props.match.params
    const spaceSeparatedTag = tag.replace(/_/g, ' ')
    const articles = this.props.articles.items.filter(item => item.tags.includes(spaceSeparatedTag))
    return (
      <div>
        <Helmet>
          <title>{`${spaceSeparatedTag} | Tags`}</title>
          <meta name='title' content={`${spaceSeparatedTag} | Tags | ${siteName}`} />
          <meta name='description' content={`Tags | ${spaceSeparatedTag} | ${description}`} />
          <meta property='og:title' content={`${spaceSeparatedTag} | Tags | ${siteName}`} />
          <meta property='og:description' content={`Tags | ${spaceSeparatedTag} | ${description}`} />
          <meta property='og:url' content={`${protocol}//${domain}/tags/${tag}/`} />
        </Helmet>
        <PageTitle title={`Entries tagged with "${spaceSeparatedTag}"`} />
        <Articles articles={articles} />
      </div>
    )
  }
}
