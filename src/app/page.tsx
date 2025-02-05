import path from 'path';
import fs from 'fs/promises';
import ArticleListItem from '~/components/ArticleListItem';
import { generateArticleListWith } from '~/libs/article';

export default async function Top() {
  const articlesPath = path.join(process.cwd(), 'src', 'articles');
  const articleFileNames = await fs.readdir(articlesPath);
  const articles = await generateArticleListWith(articleFileNames);

  return (
    <div className="-mb-6">
      {articles.map((article) => (
        <ArticleListItem
          key={article.path}
          item={article}
          className="[&:not(:last-child)]:border-b border-gray-200 [&:not(:last-child)]:mb-6"
        />
      ))}
    </div>
  );
}
