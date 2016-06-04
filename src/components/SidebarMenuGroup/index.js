import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import styles from './index.styl';

export default function SidebarMenuGroup(props) {
  return (
    <div>
      <div className={styles.title}>
        <span className={styles.icon}>{props.titleIcon}</span>
        {props.title}
      </div>
      <ListGroup>{props.children}</ListGroup>
    </div>
  );
}
