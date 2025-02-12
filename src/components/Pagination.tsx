import clsx from 'clsx';
import Link from 'next/link';

export const PER_PAGE = 8;

export function calcPageCount(array: unknown[]): number {
  return Math.ceil(array.length / PER_PAGE);
}

export function sliceByPage<T>(array: T[], page: number): T[] {
  return array.slice((page - 1) * PER_PAGE, (page - 1) * PER_PAGE + PER_PAGE);
}

// basePath: /search/?q=nextjs
// page: 1
// paging: 'searchParam'
// expected: /search/?q=nextjs&p=1
//
// basePath: /search/?q=nextjs
// page: 1
// paging: 'path'
// expected: /search/1/?q=nextjs
//
// basePath: /tags/tag/
// page: 1
// paging: 'path'
// expected: /tags/tag/1/
//
// basePath: /pages/
// page: 1
// paging: 'searchParam'
// expected: /pages/?p=1
function constructPath(
  basePath: string,
  page: number,
  paging: 'path' | 'searchParam',
): string {
  const baseUrl = new URL(basePath, process.env.NEXT_PUBLIC_APP_ORIGIN);

  if (paging === 'path') {
    const url = new URL(`${page}/`, baseUrl);
    return `${url.pathname}${url.search}${url.hash}`;
  }
  if (paging === 'searchParam') {
    baseUrl.searchParams.set('p', String(page));
    return `${baseUrl.pathname}${baseUrl.search}${baseUrl.hash}`;
  }
  return '';
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  paging = 'path',
  className,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  paging?: 'path' | 'searchParam';
  className?: string;
}) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const sidePages = 2;
    const activeClassName = 'btn-active dark:bg-neutral-700 cursor-default';

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        const href = constructPath(basePath, i, paging);
        pages.push(
          <Link
            key={i}
            href={href}
            className={clsx('join-item', 'btn', {
              [activeClassName]: i === currentPage,
            })}
          >
            {i}
          </Link>,
        );
      }
    } else {
      const hrefForFirst = constructPath(basePath, 1, paging);
      pages.push(
        <Link
          key={1}
          href={hrefForFirst}
          className={clsx('join-item', 'btn', {
            [activeClassName]: 1 === currentPage,
          })}
        >
          1
        </Link>,
      );

      if (currentPage > sidePages + 2) {
        pages.push(
          <span key="start-ellipsis" className="join-item btn btn-disabled">
            ...
          </span>,
        );
      }

      const start = Math.max(2, currentPage - sidePages);
      const end = Math.min(totalPages - 1, currentPage + sidePages);

      for (let i = start; i <= end; i++) {
        const href = constructPath(basePath, i, paging);
        pages.push(
          <Link
            key={i}
            href={href}
            className={clsx('join-item', 'btn', {
              [activeClassName]: i === currentPage,
            })}
          >
            {i}
          </Link>,
        );
      }

      if (currentPage < totalPages - sidePages - 1) {
        pages.push(
          <span key="end-ellipsis" className="join-item btn btn-disabled">
            ...
          </span>,
        );
      }

      const hrefForLast = constructPath(basePath, totalPages, paging);
      pages.push(
        <Link
          key={totalPages}
          href={hrefForLast}
          className={clsx('join-item', 'btn', {
            [activeClassName]: currentPage === totalPages,
          })}
        >
          {totalPages}
        </Link>,
      );
    }
    return pages;
  };

  return <div className={clsx('join', className)}>{renderPageNumbers()}</div>;
}
