import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import truncate from 'lodash/truncate'
import classnames from 'classnames'
import Octicon from 'components/utils/Octicon'
import styles from './index.styl'

const ArticleNavigation = ({ next, prev }) => {
  return (
    <Pagination className={classnames(styles.root, styles.pager)}>
      {prev ? (
        <LinkContainer to={prev.url} title={`Previous Article: ${prev.title}`}>
          <Pagination.Prev>
            <Octicon name='chevron-left' className={styles.icon} />
            {' '}
            {truncate(prev.title, { length: 30 })}
          </Pagination.Prev>
        </LinkContainer>
      ) : null}
      {next ? (
        <LinkContainer to={next.url} title={`Next Article: ${next.title}`}>
          <Pagination.Next>
            {truncate(next.title, { length: 30 })}
            {' '}
            <Octicon name='chevron-right' className={styles.icon} />
          </Pagination.Next>
        </LinkContainer>
      ) : null}
    </Pagination>
  )
}

ArticleNavigation.propTypes = {
  next: PropTypes.shape({ title: PropTypes.string, url: PropTypes.string }),
  prev: PropTypes.shape({ title: PropTypes.string, url: PropTypes.string }),
}

export default ArticleNavigation
