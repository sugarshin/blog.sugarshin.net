/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import Articles from 'components/Articles'
import connectStore from 'modules/connectStore'

@connectStore()
export default class Top extends Component {
  render() {
    return <Articles articles={this.props.articles.items} id='top-article-list' />
  }
}
