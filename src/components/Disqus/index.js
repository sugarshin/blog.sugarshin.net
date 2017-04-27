import React, { Component } from 'react'
import DisqusThread from 'react-disqus-thread'
import PropTypes from 'prop-types'
import styles from './index.styl'

export default class Disqus extends Component {
  static propTypes = {
    identifier: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortname: PropTypes.string.isRequired,
    onNewComment: PropTypes.func,
  }
  handleNewComment = comment => {
    if (typeof this.props.onNewComment === 'function') {
      this.props.onNewComment(comment)
    }
  }
  constructor(props) {
    super(props)
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.identifier !== this.props.identifier ||
      nextProps.title !== this.props.title
  }
  render() {
    return (
      <div className={styles.root}>
        <DisqusThread
          shortname={this.props.shortname}
          identifier={this.props.identifier}
          title={this.props.title}
          onNewComment={this.handleNewComment}
        />
      </div>
    )
  }
}
