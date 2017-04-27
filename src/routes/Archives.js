/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PageTitle from 'components/PageTitle'
import Articles from 'components/Articles'
import connectStore from 'modules/connectStore'

@connectStore()
export default class Archives extends Component {
  render() {
    const { date } = this.props.match.params
    return (
      <div>
        <Helmet>
          <title>{`${date} | Archives`}</title>
        </Helmet>
        <PageTitle title={`Entries from ${date}`} />
                                                          {/*TODO*/}
        <Articles articles={this.props.articles.archives[date] || []} />
      </div>
    )
  }
}
