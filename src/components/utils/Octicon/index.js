import React from 'react'
import PropTypes from 'prop-types'
import OcticonsReact, { getIconByName } from '@primer/octicons-react'
import classnames from 'classnames'
import styles from './index.styl'

const Octicon = ({ name, spin, className, ...props }) => (
  <span
    className={classnames(styles.root, className, { [styles.spin]: spin })}
  >
    <OcticonsReact {...props} icon={getIconByName(name)} />
  </span>
)

Octicon.propTypes = {
  name: PropTypes.string.isRequired,
  spin: PropTypes.bool,
  className: PropTypes.string,
}

export default Octicon
