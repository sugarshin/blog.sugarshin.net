import { ClockIcon, PencilIcon, TagIcon } from '@primer/octicons-react';
import Link from 'next/link';
import type { ArticleMeta } from '~/types';

export default function ArticleMeta({ meta }: { meta: ArticleMeta }) {
  return (
    <div className="text-right py-4">
      <ul className="py-1">
        {meta.tags.map((tag) => (
          <li key={tag} className="inline-block ml-1">
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
            rel="noopener
            noreferrer"
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
