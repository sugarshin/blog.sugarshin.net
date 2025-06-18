import Link from 'next/link';
import ArticleMeta from '~/components/ArticleMeta';
import type { ArticleListItem as TArticleListItem } from '~/types';

export default function ArticleListItem({
  item,
  className,
}: {
  item: TArticleListItem;
  className?: string;
}) {
  return (
    <div className={className}>
      <Link href={item.path} className="link">
        <h2 className="text-4xl">{item.title}</h2>
      </Link>
      <p className="my-2 py-2">{item.beginning}</p>
      <ArticleMeta meta={item} className="my-2" />
    </div>
  );
}
