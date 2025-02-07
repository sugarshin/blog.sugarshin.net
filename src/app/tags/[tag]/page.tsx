import ArticleList from '~/components/ArticleList';
import Pagination, {
  calcPageCount,
  sliceByPage,
} from '~/components/Pagination';
import { generateArticleListWith, getArticleFileNames } from '~/libs/article';

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const forPathTag = (await params).tag;
  const currentPage = 1;
  const tag = forPathTag.replace(/_/g, ' ');
  const articleFileNames = await getArticleFileNames();
  const articles = await generateArticleListWith(
    articleFileNames,
    (_, frontmatter) => frontmatter.tags.includes(tag),
  );
  const pageCount = calcPageCount(articles);
  const sliced = sliceByPage(articles, currentPage);

  return (
    <div>
      <h1 className="text-4xl border-b border-gray-200 py-4 text-base-content font-bold">
        Entries tagged with &quot;{tag}&quot;
      </h1>
      <ArticleList articles={sliced} className="mt-4" />
      <div className="text-center">
        <Pagination
          currentPage={currentPage}
          totalPages={pageCount}
          basePath={`/tags/${forPathTag}`}
          className="my-6"
        />
      </div>
    </div>
  );
}
