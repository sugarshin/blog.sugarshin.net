'use client';

import { TagIcon } from '@primer/octicons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TagListItem } from '~/types';

export default function SideMenuTagList({
  list,
  className,
}: { list: TagListItem[]; className?: string }) {
  const pathname = usePathname();

  return (
    <ul className={clsx('list', 'rounded-box', 'shadow-xs', className)}>
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide menu-title block">
        <TagIcon className="inline-block mr-1" />
        <span>TAGS</span>
      </li>
      {list.map((item) => {
        return (
          <li key={item.forPath} className="list-row">
            <Link
              href={`/tags/${item.forPath}/`}
              className={clsx('list-col-grow', {
                'menu-active': pathname === `/tags/${item.forPath}/`,
              })}
            >
              {item.tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
