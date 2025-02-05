import path from 'path';
import fs from 'fs/promises';
import { generateArticleListAll } from '~/libs/article';

export default async function Top() {
  const articlesPath = path.join(process.cwd(), 'src', 'articles');
  const articleFileNames = await fs.readdir(articlesPath);
  const articles = await generateArticleListAll(articleFileNames);
  console.log(articles);
  return <div>Top</div>;
}
