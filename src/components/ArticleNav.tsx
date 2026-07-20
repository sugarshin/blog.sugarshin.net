import { ArrowLeftIcon, ArrowRightIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { SideMenuArticleListItem } from '~/types';

export default function ArticleNav({
  older,
  newer,
}: {
  older: SideMenuArticleListItem | null;
  newer: SideMenuArticleListItem | null;
}) {
  if (!older && !newer) {
    return null;
  }

  return (
    <nav
      aria-label="Article navigation"
      className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-6 border-t border-gray-200"
    >
      {older && (
        <Link
          href={older.path}
          rel="prev"
          className="btn btn-ghost h-auto min-h-0 py-3 justify-start text-left"
        >
          <ArrowLeftIcon className="shrink-0" aria-hidden="true" />
          <span className="flex flex-col items-start gap-1">
            <span className="text-xs opacity-70 uppercase tracking-wide">
              Older post
            </span>
            <span className="line-clamp-2 font-normal">{older.title}</span>
          </span>
        </Link>
      )}
      {newer && (
        <Link
          href={newer.path}
          rel="next"
          className="btn btn-ghost h-auto min-h-0 py-3 justify-end text-right sm:col-start-2"
        >
          <span className="flex flex-col items-end gap-1">
            <span className="text-xs opacity-70 uppercase tracking-wide">
              Newer post
            </span>
            <span className="line-clamp-2 font-normal">{newer.title}</span>
          </span>
          <ArrowRightIcon className="shrink-0" aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}
