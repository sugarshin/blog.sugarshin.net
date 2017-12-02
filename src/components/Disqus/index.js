import React from 'react'
import DisqusComments from 'react-disqus-comments'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './index.styl'

const Disqus = ({ className, ...rest }) => (
  <div className={classnames(styles.root, className)}>
    <DisqusComments {...rest} />
  </div>
)

Disqus.propTypes = {
  className: PropTypes.string,
  identifier: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  onNewComment: PropTypes.func,
}

export default Disqus
