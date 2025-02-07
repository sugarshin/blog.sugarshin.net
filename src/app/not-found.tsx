// import { AlertIcon } from '@primer/octicons-react';
import Link from 'next/link';
// import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div>
      <h2>404 Notfound</h2>
      <p>
        <Link href="/">Return to top</Link>
      </p>
    </div>
  );
}
