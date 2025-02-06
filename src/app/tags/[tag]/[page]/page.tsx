import ArticleList from '~/components/ArticleList';
import Pagination, {
  calcPageCount,
  sliceByPage,
} from '~/components/Pagination';
import { generateArticleListWith, getArticleFileNames } from '~/libs/article';

export default async function Page({
  params,
}: {
  params: Promise<{ page: string; tag: string }>;
}) {
  const currentPage = Number((await params).page);
  const forPathTag = (await params).tag;
  const tag = forPathTag.replace(/_/g, ' ');
  const articleFileNames = await getArticleFileNames();
  const articles = await generateArticleListWith(
    articleFileNames,
    (_, frontmatter) => frontmatter.tags.includes(tag),
  );
  const pageCount = calcPageCount(articles);
  const sliced = sliceByPage(articles, currentPage);

  return (
    <>
      <ArticleList articles={sliced} />
      <div className="text-center">
        <Pagination
          currentPage={currentPage}
          totalPages={pageCount}
          className="my-6"
          basePath={`/tags/${forPathTag}`}
        />
      </div>
    </>
  );
}

export async function generateStaticParams({
  params,
}: { params: { tag: string } }) {
  const forPathTag = (await params).tag;
  const tag = forPathTag.replace(/_/g, ' ');
  const articleFileNames = await getArticleFileNames();
  const articles = await generateArticleListWith(
    articleFileNames,
    (_, frontmatter) => frontmatter.tags.includes(tag),
  );
  const pageCount = calcPageCount(articles);

  return Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => {
    return {
      page: number.toString(),
    };
  });
}
