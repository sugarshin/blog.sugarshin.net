import React, { Component } from 'react';
import Octicon from 'react-octicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { LinkContainer } from 'react-router-bootstrap';
import moment from 'moment';
import SidebarMenuGroup from 'components/SidebarMenuGroup';

export default class SidebarMenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <SidebarMenuGroup
          { ...this.props }
          id='recent-posts'
          title='Recent posts'
          titleIcon={<Octicon name='megaphone' />}
        >
          {this._renderRecentPosts()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          { ...this.props }
          id='archives'
          title='Archives'
          titleIcon={<Octicon name='calendar' />}
        >
          {this._renderArchives()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          { ...this.props }
          id='tags'
          title='Tags'
          titleIcon={<Octicon name='tag' />}
        >
          {this._renderTags()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          { ...this.props }
          id='links'
          title='Links'
          titleIcon={<Octicon name='link' />}
        >
          {this._renderLinks()}
        </SidebarMenuGroup>
      </div>
    );
  }
  _renderRecentPosts() {
    return this.props.articles.items.filter((a, i) => i < 5).map(item => {
      const [year, month, day] = item.date.split(' ')[0].split('-');
      return (
        <LinkContainer key={item.url} to={`/${year}/${month}/${day}/${item.url}`}>
          <ListGroupItem>{item.title}</ListGroupItem>
        </LinkContainer>
      );
    });
  }
  _renderArchives() {
    return Object.keys(this.props.articles.archives).map(date => {
      const [year, month] = date.split('-');
      const url = `/archives/${year}-${month}/`;
      return (
        <LinkContainer key={url} to={url}>
          <ListGroupItem>{moment(date).format('MMMM YYYY')}</ListGroupItem>
        </LinkContainer>
      );
    })
  }
  _renderTags() {
    return this.props.articles.tags.map(tag => {
      const url = `/tags/${tag}/`;
      return (
        <LinkContainer key={url} to={url}>
          <ListGroupItem key={url}>{tag}</ListGroupItem>
        </LinkContainer>
      );
    })
  }
  _renderLinks() {
    return [
      <ListGroupItem key='sugarshin.net' href='https://sugarshin.net'>About</ListGroupItem>,
      <ListGroupItem key='github' href='https://github.com/sugarshin'>GitHub</ListGroupItem>,
      <ListGroupItem key='npm' href='https://www.npmjs.com/~sugarshin'>npm</ListGroupItem>,
      <ListGroupItem key='twitter' href='https://twitter.com/sugarshin'>Twitter</ListGroupItem>,
      <ListGroupItem key='instagram' href='https://www.instagram.com/sugarshin/'>Instagram</ListGroupItem>
    ];
  }
}
