import React from 'react';
import Link from 'react-router/lib/Link';
import { protocol, domain } from '../../../config/settings';
import styles from './index.styl';

export default function SearchResults(props) {
  return (
    <div className={styles.root}>
      <ul>
        {props.items.map(a => {
          const [date, name] = a.name.split('_');
          const to = `/${date.replace(/-/g, '/')}/${name.replace(/\.md$/, '')}/`;
          return (
            <li key={to}>
              <Link to={to}>{`${protocol}//${domain}${to}`}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
