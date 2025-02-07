import { InfoIcon, RssIcon } from '@primer/octicons-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function LinkList({ className }: { className?: string }) {
  return (
    <ul className={clsx('list', 'rounded-box', 'shadow-xs', className)}>
      <li className="p-4 text-xs opacity-60 tracking-wide menu-title block">
        <InfoIcon className="inline-block mr-1" />
        <span className="uppercase">Information</span>
      </li>
      <li className="list-row">
        <Link href="/rss.xml" className="list-col-grow" target="_blank">
          <RssIcon className="inline-block" />
          <span>Subscribe to feed (RSS 2.0)</span>
        </Link>
      </li>
      <li className="list-row">
        <Link href="/feed.xml" className="list-col-grow" target="_blank">
          <RssIcon className="inline-block" />
          <span>Subscribe to feed (Atom 1.0)</span>
        </Link>
      </li>
    </ul>
  );
}
