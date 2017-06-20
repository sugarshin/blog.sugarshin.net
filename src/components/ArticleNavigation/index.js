import React from 'react'
import { Pager } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import truncate from 'lodash/truncate'
import classnames from 'classnames'
import Octicon from 'components/utils/Octicon'
import styles from './index.styl'

const ArticleNavigation = ({ next, prev }) => {
  return (
    <Pager className={classnames(styles.root, styles.pager)}>
      {next ? (
        <LinkContainer to={next.url} title={`Next Article: ${next.title}`}>
          <Pager.Item next>
            {truncate(next.title, { length: 30 })}
            {' '}
            <Octicon name='chevron-right' className={styles.icon} />
          </Pager.Item>
        </LinkContainer>
      ) : null}
      {prev ? (
        <LinkContainer to={prev.url} title={`Previous Article: ${prev.title}`}>
          <Pager.Item previous>
            <Octicon name='chevron-left' className={styles.icon} />
            {' '}
            {truncate(prev.title, { length: 30 })}
          </Pager.Item>
        </LinkContainer>
      ) : null}
    </Pager>
  )
}

ArticleNavigation.propTypes = {
  next: PropTypes.shape({ title: PropTypes.string, url: PropTypes.string }),
  prev: PropTypes.shape({ title: PropTypes.string, url: PropTypes.string }),
}

export default ArticleNavigation
