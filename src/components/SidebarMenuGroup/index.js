import React from 'react'
import { ListGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styles from './index.styl'

export default function SidebarMenuGroup({ titleIcon, title, children }) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <span className={styles.icon}>{titleIcon}</span>
        {title}
      </div>
      <ListGroup>{children}</ListGroup>
    </div>
  )
}

SidebarMenuGroup.propTypes = {
  titleIcon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}
