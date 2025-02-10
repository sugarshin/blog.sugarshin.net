import { RssIcon } from '@primer/octicons-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function RssFeedList({ className }: { className?: string }) {
  return (
    <ul className={clsx('list', 'rounded-box', 'shadow-xs', className)}>
      <li className="p-4 text-xs opacity-60 tracking-wide menu-title block">
        <RssIcon className="inline-block mr-1" />
        <span className="uppercase">RSS Feed</span>
      </li>
      <li className="list-row">
        <Link
          href="/rss.xml"
          prefetch={false}
          className="list-col-grow"
          target="_blank"
        >
          <span>Subscribe to feed (RSS 2.0)</span>
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="/feed.xml"
          prefetch={false}
          className="list-col-grow"
          target="_blank"
        >
          <span>Subscribe to feed (Atom 1.0)</span>
        </Link>
      </li>
    </ul>
  );
}
