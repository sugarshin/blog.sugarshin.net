import ArticleList from '~/components/ArticleList';
import { generateArticleListWith, getArticleFileNames } from '~/libs/article';

export default async function Top() {
  const articleFileNames = await getArticleFileNames();
  const articles = await generateArticleListWith(articleFileNames);

  return <ArticleList articles={articles} className="-mb-6" />;
}
