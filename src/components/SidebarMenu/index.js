/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import { ListGroup, FormControl } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { MegaphoneIcon, CalendarIcon, TagIcon, LinkIcon, SearchIcon, RssIcon } from '@primer/octicons-react'
import keydown, { Keys } from 'react-keydown'
import moment from 'moment'
import queryString from 'query-string'
import SidebarMenuGroup from 'components/SidebarMenuGroup'
import { feedURL } from '../../../config/settings'
import styles from './index.styl'

export default class SidebarMenu extends Component {
  handleChangeSearchQuery = e => this.setState({ searchQuery: e.target.value })

  constructor(props) {
    super(props)
    this.state = { searchQuery: this.parseSearchQuery(this.props.location.search) }
  }
  componentDidUpdate({ location: { search: prevSearch } }) {
    const currentSearchQuery = this.parseSearchQuery(this.props.location.search)
    const prevSearchQuery = this.parseSearchQuery(prevSearch)
    if (prevSearchQuery !== currentSearchQuery) {
      this.setState({ searchQuery: currentSearchQuery })
    }
  }
  render() {
    return (
      <div>
        <SidebarMenuGroup
          {...this.props}
          id='recent-posts'
          title='Recent posts'
          titleIcon={<MegaphoneIcon />}
        >
          {this.renderRecentPosts()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          {...this.props}
          id='archives'
          title='Archives'
          titleIcon={<CalendarIcon />}
        >
          {this.renderArchives()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          {...this.props}
          id='tags'
          title='Tags'
          titleIcon={<TagIcon />}
        >
          {this.renderTags()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          {...this.props}
          id='links'
          title='Links'
          titleIcon={<LinkIcon />}
        >
          {this.renderLinks()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          {...this.props}
          id='search-article'
          title='Search'
          titleIcon={<SearchIcon />}
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
            <RssIcon className={styles['feed-octicon']} /><span>Subscribe Feed</span>
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
        <ListGroup.Item
          key={item.url}
          to={`/${year}/${month}/${day}/${item.url}`}
          as={NavLink}
          className={styles.link}
          action
        >
          {item.title}
        </ListGroup.Item>
      )
    })
  }
  renderArchives() {
    return Object.keys(this.props.articles.archives).map(date => {
      const [year, month] = date.split('-')
      const url = `/archives/${year}-${month}/`
      return (
        <ListGroup.Item
          key={url}
          to={url}
          as={NavLink}
          className={styles.link}
          action
        >
          {moment(date).format('MMMM YYYY')}
        </ListGroup.Item>
      )
    })
  }
  renderTags() {
    return this.props.articles.tags.map(tag => {
      const url = `/tags/${tag.replace(/\s/g, '_')}/`
      return (
        <ListGroup.Item
          key={url}
          to={url}
          as={NavLink}
          className={styles.link}
          action
        >
          {tag}
        </ListGroup.Item>
      )
    })
  }
  renderLinks() {
    return [
      <ListGroup.Item key='sugarshin.net' href='//sugarshin.net/' action>About</ListGroup.Item>,
      <ListGroup.Item key='github' href='//github.com/sugarshin/' action>GitHub</ListGroup.Item>,
      <ListGroup.Item key='npm' href='//www.npmjs.com/~sugarshin/' action>npm</ListGroup.Item>,
      <ListGroup.Item key='keybase' href='//keybase.io/sugarshin/' action>Keybase</ListGroup.Item>,
      <ListGroup.Item key='twitter' href='//twitter.com/sugarshin/' action>Twitter</ListGroup.Item>,
      <ListGroup.Item key='instagram' href='//www.instagram.com/sugarshin/' action>Instagram</ListGroup.Item>,
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
