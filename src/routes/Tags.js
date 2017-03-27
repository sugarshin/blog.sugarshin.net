import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PageTitle from 'components/PageTitle'
import Articles from 'components/Articles'
import connectStore from 'modules/connectStore'

@connectStore()
export default class Tags extends Component {
  render() {
    const { tag } = this.props.match.params
    const articles = this.props.articles.items.filter(item => item.tags.includes(tag.replace(/_/g, ' ')))
    return (
      <div>
        <Helmet>
          <title>{`${tag} | Tags`}</title>
        </Helmet>
        <PageTitle title={`Entries tagged with ${tag}`} />
        <Articles articles={articles} />
      </div>
    )
  }
}
