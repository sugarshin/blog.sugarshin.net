import { ClockIcon, PencilIcon, TagIcon } from '@primer/octicons-react';
import clsx from 'clsx';
import Link from 'next/link';

export type ArticleMetaData = {
  tags: string[];
  author: {
    name: string;
    url: string;
  };
  date: string;
};

export default function ArticleMeta({
  meta,
  className,
}: { meta: ArticleMetaData; className?: string }) {
  return (
    <div className={clsx('text-right', 'py-2', className)}>
      <ul className="py-1">
        {meta.tags.map((tag) => (
          <li key={tag} className="inline-block ml-1 mb-1">
            <Link
              href={`/tags/${tag.replace(/\s/g, '_')}`}
              className="btn btn-xs btn-rounded btn-primary"
              role="button"
            >
              <TagIcon />
              {tag}
            </Link>
          </li>
        ))}
      </ul>
      <div className="py-1">
        <span>
          <PencilIcon className="inline-block" />
          <Link
            href={meta.author.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="link ml-1"
          >
            {meta.author.name}
          </Link>
        </span>
        <span className="ml-4">
          <ClockIcon className="inline-block" />
          <time className="ml-1">{meta.date}</time>
        </span>
      </div>
    </div>
  );
}
