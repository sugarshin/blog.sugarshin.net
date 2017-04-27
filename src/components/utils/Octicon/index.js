import React from 'react'
import PropTypes from 'prop-types'
import octicons from 'octicons'
import classnames from 'classnames'
import 'octicons/build/octicons.css'
import styles from './index.styl'

const Octicon = ({ name, spin, className, ...props }) => (
  <span
    {...props}
    className={classnames('octicon-container', className, { [styles.spin]: spin })}
    dangerouslySetInnerHTML={{ __html: octicons[name].toSVG() }}
  />
)

Octicon.propTypes = {
  name: PropTypes.string.isRequired,
  spin: PropTypes.bool,
  className: PropTypes.string,
}

export default Octicon
