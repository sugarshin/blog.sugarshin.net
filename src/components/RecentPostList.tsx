'use client';

import { MegaphoneIcon } from '@primer/octicons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RecentPostList({
  posts,
  className,
}: {
  posts: { title: string; path: string }[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <ul className={clsx('list', 'rounded-box', 'shadow-xs', className)}>
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide menu-title block">
        <MegaphoneIcon className="inline-block mr-1" />
        <span className="uppercase">Recent posts</span>
      </li>
      {posts.map((post) => (
        <li key={post.path} className="list-row">
          <Link
            href={post.path}
            className={clsx('list-col-grow', {
              'menu-active': pathname === post.path,
            })}
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
