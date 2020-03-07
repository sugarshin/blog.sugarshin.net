import React from 'react'
import DisqusReact from 'disqus-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { context as uaContext } from 'context/ua'
import styles from './index.styl'

const Disqus = ({ className, shortname, identifier, title, url }) => {
  const ua = React.useContext(uaContext)

  return (
    <div className={classnames(styles.root, className)}>
      {/ReactSnap/.test(ua) ? null : (
        <DisqusReact.DiscussionEmbed shortname={shortname} config={{ identifier, title, url }} />
      )}
    </div>
  )
}

Disqus.propTypes = {
  className: PropTypes.string,
  identifier: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onNewComment: PropTypes.func,
}

export default Disqus
