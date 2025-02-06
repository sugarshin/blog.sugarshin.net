import clsx from 'clsx';
import Link from 'next/link';

export const PER_PAGE = 8;

export function calcPageCount(array: unknown[]): number {
  return Math.ceil(array.length / PER_PAGE);
}

export function sliceByPage<T>(array: T[], page: number): T[] {
  return array.slice((page - 1) * PER_PAGE, (page - 1) * PER_PAGE + PER_PAGE);
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath: _basePath,
  className,
}: {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  className?: string;
}) {
  const basePath = _basePath ? _basePath.replace(/\/$/, '') : '';

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const sidePages = 2;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Link
            key={i}
            href={`${basePath}/${i}/`}
            className={clsx('join-item', 'btn', {
              'btn-active cursor-default': i === currentPage,
            })}
          >
            {i}
          </Link>,
        );
      }
    } else {
      pages.push(
        <Link
          key={1}
          href={`${basePath}/1/`}
          className={clsx('join-item', 'btn', {
            'btn-active cursor-default': 1 === currentPage,
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
        pages.push(
          <Link
            key={i}
            href={`${basePath}/${i}/`}
            className={clsx('join-item', 'btn', {
              'btn-active cursor-default': i === currentPage,
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

      pages.push(
        <Link
          key={totalPages}
          href={`${basePath}/${totalPages}/`}
          className={clsx('join-item', 'btn', {
            'btn-active cursor-default': currentPage === totalPages,
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
