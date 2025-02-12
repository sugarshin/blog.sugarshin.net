'use client';

import { ArrowRightIcon, CalendarIcon } from '@primer/octicons-react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ArchiveList({
  archives,
  className,
}: { archives: string[]; className?: string }) {
  const pathname = usePathname();

  return (
    <ul className={clsx('list', 'rounded-box', 'shadow-xs', className)}>
      <li className="p-4 text-xs opacity-70 tracking-wide menu-title block">
        <CalendarIcon className="inline-block mr-1" />
        <span className="uppercase">Archives</span>
      </li>
      {archives.map((archive) => (
        <li key={archive} className="list-row">
          <Link
            href={`/archives/${archive}/`}
            className={clsx('list-col-grow', {
              'menu-active': pathname === `/archives/${archive}/`,
            })}
          >
            {dayjs(archive).format('MMMM, YYYY')}
          </Link>
        </li>
      ))}
      <li className="list-row">
        <Link href="/archives/" className="list-col-grow">
          <span>More...</span>
          <ArrowRightIcon className="inline-block" />
        </Link>
      </li>
    </ul>
  );
}
