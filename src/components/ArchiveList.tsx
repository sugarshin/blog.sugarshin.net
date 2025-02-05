'use client';

import { CalendarIcon } from '@primer/octicons-react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ArchiveList({ archives }: { archives: string[] }) {
  const pathname = usePathname();

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide menu-title block">
        <CalendarIcon className="inline-block mr-1" />
        <span>ARCHIVES</span>
      </li>
      {archives.map((archive) => (
        <li key={archive} className="list-row">
          <Link
            href={`/archives/${archive}/`}
            className={clsx('list-col-grow', {
              'menu-active': pathname === `/archives/${archive}/`,
            })}
          >
            {dayjs(archive).format('MMMM YYYY')}
          </Link>
        </li>
      ))}
    </ul>
  );
}
