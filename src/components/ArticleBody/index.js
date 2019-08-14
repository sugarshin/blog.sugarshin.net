import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import markdownRenderer from '../../../helpers/markdownRenderer'
import styles from './index.styl'

export default function ArticleBody({ markdown }) {
  return (
    <div className={classnames('markdown-body', styles.body)}>
      {markdownRenderer.toReact(markdown)}
    </div>
  )
}

ArticleBody.propTypes = {
  markdown: PropTypes.string.isRequired,
}
