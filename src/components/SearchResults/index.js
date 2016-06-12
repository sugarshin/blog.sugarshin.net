import React from 'react';
import Link from 'react-router/lib/Link';
import { protocol, domain } from '../../../config/settings';

export default function SearchResults(props) {
  return (
    <div>
      {props.items.map(a => {
        const [date, name] = a.name.split('_');
        const to = `/${date.replace(/-/g, '/')}/${name.replace(/\.md$/, '')}/`;
        return (
          <div key={to}>
            <Link to={to}>{`${protocol}//${domain}${to}`}</Link>
          </div>
        );
      })}
    </div>
  );
}
