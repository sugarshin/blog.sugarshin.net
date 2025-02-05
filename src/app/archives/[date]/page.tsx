import fs from 'node:fs/promises';
import path from 'node:path';
import ArticleListItem from '~/components/ArticleListItem';
import { generateArchiveMonths, generateArticleListWith } from '~/libs/article';

export default async function Page({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const date = (await params).date;
  const articlesPath = path.join(process.cwd(), 'src', 'articles');
  const articleFileNames = await fs.readdir(articlesPath);
  const articles = await generateArticleListWith(
    articleFileNames,
    (fileName) => {
      const [dateStr] = fileName.split('_');
      return dateStr.startsWith(date);
    },
  );

  return (
    <div>
      <h1 className="text-4xl border-b border-gray-200 py-4 text-base-content font-bold">
        Archives {date}
      </h1>
      <div>
        {articles.map((article) => (
          <ArticleListItem key={article.path} item={article} />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const articlesPath = path.join(process.cwd(), 'src', 'articles');
  const articleFileNames = await fs.readdir(articlesPath);
  const months = generateArchiveMonths(articleFileNames);

  return months.map((m) => {
    return {
      date: m,
    };
  });
}
