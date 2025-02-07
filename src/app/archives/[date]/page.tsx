import dayjs from 'dayjs';
import ArticleList from '~/components/ArticleList';
import {
  generateArchiveMonths,
  generateArticleListWith,
  getArticleFileNames,
} from '~/libs/article';

export default async function Page({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const date = (await params).date;
  const articleFileNames = await getArticleFileNames();
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
        Archives {dayjs(date).format('MMMM, YYYY')}
      </h1>
      <ArticleList articles={articles} className="mt-4" />
    </div>
  );
}

export async function generateStaticParams() {
  const articleFileNames = await getArticleFileNames();
  const months = generateArchiveMonths(articleFileNames);

  return months.map((m) => {
    return {
      date: m,
    };
  });
}
