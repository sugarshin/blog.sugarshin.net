import ArticleList from '~/components/ArticleList';
import Pagination, {
  calcPageCount,
  sliceByPage,
} from '~/components/Pagination';
import { generateArticleListWith, getArticleFileNames } from '~/libs/article';

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const currentPage = Number((await params).page);
  const articleFileNames = await getArticleFileNames();
  const pageCount = calcPageCount(articleFileNames);
  const sliced = sliceByPage(articleFileNames, currentPage);
  const articles = await generateArticleListWith(sliced);
  return (
    <>
      <ArticleList articles={articles} />
      <div className="text-center">
        <Pagination
          currentPage={currentPage}
          totalPages={pageCount}
          basePath="/page/"
          className="my-6"
        />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const articleFileNames = await getArticleFileNames();
  const pageCount = calcPageCount(articleFileNames);

  return Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => {
    return {
      page: number.toString(),
    };
  });
}
