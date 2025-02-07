import { LinkExternalIcon } from '@primer/octicons-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function LinkList({ className }: { className?: string }) {
  return (
    <ul className={clsx('list', 'rounded-box', 'shadow-xs', className)}>
      <li className="p-4 text-xs opacity-60 tracking-wide menu-title block">
        <LinkExternalIcon className="inline-block mr-1" />
        <span className="uppercase">Links</span>
      </li>
      <li className="list-row">
        <Link
          href="https://sugarshin.net/"
          className="list-col-grow"
          target="_blank"
          rel="noopener noreferrer"
        >
          About
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://github.com/sugarshin/"
          className="list-col-grow"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://www.linkedin.com/in/shingosato/"
          className="list-col-grow"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://x.com/sugarshin/"
          className="list-col-grow"
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://instagram.com/sugarshin"
          className="list-col-grow"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://www.facebook.com/sngsato"
          className="list-col-grow"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://keybase.io/sugarshin"
          className="list-col-grow"
          target="_blank"
          rel="noopener noreferrer"
        >
          Keybase
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://www.strava.com/athletes/sugarshin"
          className="list-col-grow"
          target="_blank"
          rel="noopener noreferrer"
        >
          Strava
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://sauna-ikitai.com/saunners/66527"
          className="list-col-grow"
          target="_blank"
          rel="noopener noreferrer"
        >
          サウナイキタイ
        </Link>
      </li>
    </ul>
  );
}
