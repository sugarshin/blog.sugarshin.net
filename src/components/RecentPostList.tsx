'use client';

import { MegaphoneIcon } from '@primer/octicons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RecentPostList({
  posts,
}: { posts: { title: string; path: string }[] }) {
  const pathname = usePathname();

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide menu-title block">
        <MegaphoneIcon className="inline-block mr-1" />
        <span>RECENT POSTS</span>
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
