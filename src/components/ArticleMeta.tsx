import { ClockIcon, PencilIcon, TagIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { normalizeTags } from '~/libs/markdown';
import type { Frontmatter } from '~/types';

export default function ArticleMeta({
  frontmatter,
}: { frontmatter: Frontmatter }) {
  return (
    <div className="text-right py-4">
      <ul className="py-1">
        {normalizeTags(frontmatter.tags).map((tag) => (
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
            href={frontmatter.author.url}
            target="_blank"
            rel="noopener
            noreferrer"
            className="link ml-1"
          >
            {frontmatter.author.name}
          </Link>
        </span>
        <span className="ml-4">
          <ClockIcon className="inline-block" />
          <time className="ml-1">{frontmatter.date}</time>
        </span>
      </div>
    </div>
  );
}
