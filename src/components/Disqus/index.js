import React, { Component } from 'react';
import DisqusThread from 'react-disqus-thread';
import styles from './index.styl';

export default class Disqus extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.identifier !== this.props.identifier ||
      nextProps.title !== this.props.title;
  }
  render() {
    return (
      <div className={styles.root}>
        <DisqusThread
          shortname={this.props.shortname}
          identifier={this.props.identifier}
          title={this.props.title}
          onNewComment={this.props.onNewComment} />
      </div>
    );
  }
}
