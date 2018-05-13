/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import FormControl from 'react-bootstrap/lib/FormControl'
import { LinkContainer } from 'react-router-bootstrap'
import keydown, { Keys } from 'react-keydown'
import moment from 'moment'
import queryString from 'query-string'
import SidebarMenuGroup from 'components/SidebarMenuGroup'
import Octicon from 'components/utils/Octicon'
import { feedURL } from '../../../config/settings'
import styles from './index.styl'

export default class SidebarMenu extends Component {
  handleChangeSearchQuery = e => this.setState({ searchQuery: e.target.value })

  constructor(props) {
    super(props)
    this.state = { searchQuery: this.parseSearchQuery(this.props.location.search) }
  }
  UNSAFE_componentWillReceiveProps({ location: { search } }) {
    const currentSearchQuery = this.parseSearchQuery(this.props.location.search)
    const newSearchQuery = this.parseSearchQuery(search)
    if (currentSearchQuery !== newSearchQuery) {
      this.setState({ searchQuery: newSearchQuery })
    }
  }
  render() {
    return (
      <div>
        <SidebarMenuGroup
          {...this.props}
          id='recent-posts'
          title='Recent posts'
          titleIcon={<Octicon name='megaphone' />}
        >
          {this.renderRecentPosts()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          {...this.props}
          id='archives'
          title='Archives'
          titleIcon={<Octicon name='calendar' />}
        >
          {this.renderArchives()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          {...this.props}
          id='tags'
          title='Tags'
          titleIcon={<Octicon name='tag' />}
        >
          {this.renderTags()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          {...this.props}
          id='links'
          title='Links'
          titleIcon={<Octicon name='link' />}
        >
          {this.renderLinks()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          {...this.props}
          id='search-article'
          title='Search'
          titleIcon={<Octicon name='search' />}
        >
          <FormControl
            onKeyDown={this.submitSearchQuery}
            onChange={this.handleChangeSearchQuery}
            type='text'
            placeholder='Search article'
            value={this.state.searchQuery}
          />
        </SidebarMenuGroup>
        <div className={styles.feed}>
          <a href={`/${feedURL}`}>
            <Octicon name='rss' className={styles['feed-octicon']} /><span>Subscribe Feed</span>
          </a>
        </div>
        <div>
          <a href='https://circleci.com/gh/sugarshin/blog.sugarshin.net/tree/master'>
            <img src='https://circleci.com/gh/sugarshin/blog.sugarshin.net/tree/master.svg?style=svg&circle-token=812f62f2aeba2a3bb9bfe6adf2abd24d7754a7be' />
          </a>
        </div>
      </div>
    )
  }
  renderRecentPosts() {
    return this.props.articles.items.filter((a, i) => i < 5).map(item => {
      const [year, month, day] = item.date.split(' ')[0].split('-')
      return (
        <LinkContainer key={item.url} to={`/${year}/${month}/${day}/${item.url}`}>
          <ListGroupItem>{item.title}</ListGroupItem>
        </LinkContainer>
      )
    })
  }
  renderArchives() {
    return Object.keys(this.props.articles.archives).map(date => {
      const [year, month] = date.split('-')
      const url = `/archives/${year}-${month}/`
      return (
        <LinkContainer key={url} to={url}>
          <ListGroupItem>{moment(date).format('MMMM YYYY')}</ListGroupItem>
        </LinkContainer>
      )
    })
  }
  renderTags() {
    return this.props.articles.tags.map(tag => {
      const url = `/tags/${tag.replace(/\s/g, '_')}/`
      return (
        <LinkContainer key={url} to={url}>
          <ListGroupItem>{tag}</ListGroupItem>
        </LinkContainer>
      )
    })
  }
  renderLinks() {
    return [
      <ListGroupItem key='sugarshin.net' href='//sugarshin.net/'>About</ListGroupItem>,
      <ListGroupItem key='github' href='//github.com/sugarshin/'>GitHub</ListGroupItem>,
      <ListGroupItem key='npm' href='//www.npmjs.com/~sugarshin/'>npm</ListGroupItem>,
      <ListGroupItem key='keybase' href='//keybase.io/sugarshin/'>Keybase</ListGroupItem>,
      <ListGroupItem key='twitter' href='//twitter.com/sugarshin/'>Twitter</ListGroupItem>,
      <ListGroupItem key='instagram' href='//www.instagram.com/sugarshin/'>Instagram</ListGroupItem>,
    ]
  }

  parseSearchQuery(search) {
    return queryString.parse(search).q || ''
  }
  @keydown(Keys.ENTER)
  submitSearchQuery({ target: { value } }) {
    if (value) {
      this.props.actions.goTo('/search', { search: `q=${value}` })
    }
  }
}
