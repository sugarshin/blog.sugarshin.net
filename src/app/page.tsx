import path from 'path';
import fs from 'fs/promises';
import ArticleList from '~/components/ArticleList';
import { generateArticleListWith } from '~/libs/article';

export default async function Top() {
  const articlesPath = path.join(process.cwd(), 'src', 'articles');
  const articleFileNames = await fs.readdir(articlesPath);
  const articles = await generateArticleListWith(articleFileNames);

  return <ArticleList articles={articles} className="-mb-6" />;
}
