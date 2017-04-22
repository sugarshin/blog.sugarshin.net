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

export default class SidebarMenu extends Component {
  constructor(props) {
    super(props)
    this.state = { searchQuery: this.parseSearchQuery(this.props.location.search) }
  }
  componentWillReceiveProps({ location: { search } }) {
    const currentSearchQuery = this.parseSearchQuery(this.props.location.search)
    const newSearchQuery = this.parseSearchQuery(search)
    if (currentSearchQuery !== newSearchQuery) {
      this.setState({ searchQuery: newSearchQuery })
    }
  }
  parseSearchQuery(search) {
    return queryString.parse(search).q || ''
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
          {this._renderRecentPosts()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          {...this.props}
          id='archives'
          title='Archives'
          titleIcon={<Octicon name='calendar' />}
        >
          {this._renderArchives()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          {...this.props}
          id='tags'
          title='Tags'
          titleIcon={<Octicon name='tag' />}
        >
          {this._renderTags()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          {...this.props}
          id='links'
          title='Links'
          titleIcon={<Octicon name='link' />}
        >
          {this._renderLinks()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          {...this.props}
          id='search-article'
          title='Search'
          titleIcon={<Octicon name='search' />}
        >
          <FormControl
            onKeyDown={this.submitSearchQuery}
            onChange={ev => this._handleChangeSearchQuery(ev)}
            type='text'
            placeholder='Search article'
            value={this.state.searchQuery}
          />
        </SidebarMenuGroup>
        <div>
          <a href='//travis-ci.org/sugarshin/log.sugarshin.net'>
            <img src='//img.shields.io/travis/sugarshin/log.sugarshin.net/master.svg?branch=master&style=flat-square' />
          </a>
        </div>
      </div>
    )
  }
  _renderRecentPosts() {
    return this.props.articles.items.filter((a, i) => i < 5).map(item => {
      const [year, month, day] = item.date.split(' ')[0].split('-')
      return (
        <LinkContainer key={item.url} to={`/${year}/${month}/${day}/${item.url}`}>
          <ListGroupItem>{item.title}</ListGroupItem>
        </LinkContainer>
      )
    })
  }
  _renderArchives() {
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
  _renderTags() {
    return this.props.articles.tags.map(tag => {
      const url = `/tags/${tag.replace(/\s/g, '_')}/`
      return (
        <LinkContainer key={url} to={url}>
          <ListGroupItem>{tag}</ListGroupItem>
        </LinkContainer>
      )
    })
  }
  _renderLinks() {
    return [
      <ListGroupItem key='sugarshin.net' href='//sugarshin.net/'>About</ListGroupItem>,
      <ListGroupItem key='github' href='//github.com/sugarshin/'>GitHub</ListGroupItem>,
      <ListGroupItem key='npm' href='//www.npmjs.com/~sugarshin/'>npm</ListGroupItem>,
      <ListGroupItem key='keybase' href='//keybase.io/sugarshin/'>Keybase</ListGroupItem>,
      <ListGroupItem key='twitter' href='//twitter.com/sugarshin/'>Twitter</ListGroupItem>,
      <ListGroupItem key='instagram' href='//www.instagram.com/sugarshin/'>Instagram</ListGroupItem>,
    ]
  }
  _handleChangeSearchQuery(ev) {
    this.setState({ searchQuery: ev.target.value })
  }
  @keydown(Keys.ENTER)
  submitSearchQuery({ target: { value } }) {
    if (value) {
      this.props.actions.goTo('/search', { search: `q=${value}` })
    }
  }
}
