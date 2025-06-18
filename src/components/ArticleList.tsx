import type { ArticleListItem as TArticleListItem } from '~/types';
import ArticleListItem from './ArticleListItem';

export default function ArticleList({
  articles,
  className,
}: {
  articles: TArticleListItem[];
  className?: string;
}) {
  return (
    <div className={className}>
      {articles.map((article) => (
        <ArticleListItem
          key={article.path}
          item={article}
          className="border-b border-gray-200 [&:not(:last-child)]:mb-4 pt-4"
        />
      ))}
    </div>
  );
}
