import React, { Component } from 'react';
import { Link } from 'react-router';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
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
        >
          {this._renderRecentPosts()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          { ...this.props }
          id='archives'
          title='Archives'
        >
          {this._renderArchives()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          { ...this.props }
          id='tags'
          title='Tags'
        >
          {this._renderTags()}
        </SidebarMenuGroup>
        <SidebarMenuGroup
          { ...this.props }
          id='links'
          title='Links'
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
        <ListGroupItem key={item.url}>
          <Link to={`/${year}/${month}/${day}/${item.url}`}>{item.title}</Link>
        </ListGroupItem>
      );
    });
  }
  _renderArchives() {
    return Object.keys(this.props.articles.archives).map(date => {
      const [year, month] = date.split('-');
      const url = `/archives/${year}-${month}/`;
      return (
        <ListGroupItem key={url}>
          <Link to={url}>{moment(date).format('MMMM YYYY')}</Link>
        </ListGroupItem>
      );
    })
  }
  _renderTags() {
    return this.props.articles.tags.map(tag => {
      const url = `/tags/${tag}/`;
      return (
        <ListGroupItem key={url}><Link to={url}>{tag}</Link></ListGroupItem>
      );
    })
  }
  _renderLinks() {
    return (
      <ListGroupItem href='//sugarshin.net'>About</ListGroupItem>
    );
  }
}
