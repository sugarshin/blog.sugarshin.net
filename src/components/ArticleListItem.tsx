import { EllipsisIcon } from '@primer/octicons-react';
import Link from 'next/link';
import ArticleMeta from '~/components/ArticleMeta';
import type { ArticleListItem as TArticleListItem } from '~/types';

export default function ArticleListItem({
  item,
  className,
}: { item: TArticleListItem; className?: string }) {
  return (
    <div className={className}>
      <Link href={item.path} className="link">
        <h2 className="text-4xl">{item.title}</h2>
      </Link>
      <p className="my-4">
        {item.beginning}
        <Link href={item.path} className="link ml-2">
          more <EllipsisIcon className="inline-block" />
        </Link>
      </p>
      <ArticleMeta meta={item} />
    </div>
  );
}
