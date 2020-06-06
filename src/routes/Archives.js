/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import PageTitle from 'components/PageTitle'
import Articles from 'components/Articles'
import connectStore from 'modules/connectStore'
import { siteName, description, protocol, domain } from '../../config/settings'

@connectStore()
export default class Archives extends Component {
  render() {
    const { date } = this.props.match.params
    return (
      <div>
        <Helmet>
          <title>{`${date} | Archives`}</title>
          <meta name='title' content={`${date} | Archives | ${siteName}`} />
          <meta name='description' content={`Archives | ${date} | ${description}`} />
          <meta property='og:title' content={`${date} | Archives | ${siteName}`} />
          <meta property='og:description' content={`Archives | ${date} | ${description}`} />
          <meta property='og:url' content={`${protocol}//${domain}/archives/${date}/`} />
        </Helmet>
        <PageTitle title={`Entries from "${date}"`} />
                                                          {/*TODO*/}
        <Articles articles={this.props.articles.archives[date] || []} />
      </div>
    )
  }
}
