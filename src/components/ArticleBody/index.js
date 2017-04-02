import React from 'react'
import classnames from 'classnames'
import markdownRenderer from '../../../universal/markdownRenderer'
import 'github-markdown-css/github-markdown.css'
import styles from './index.styl'

export default function ArticleBody({ markdown }) {
  return (
    <div className={classnames('markdown-body', styles.body)}>
      {markdownRenderer.toReact(markdown)}
    </div>
  )
}
