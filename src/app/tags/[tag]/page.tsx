import ArticleList from '~/components/ArticleList';
import {
  generateArticleListWith,
  generateTagList,
  getArticleFileNames,
} from '~/libs/article';

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const forPathTag = (await params).tag;
  const tag = forPathTag.replace(/_/g, ' ');
  const articleFileNames = await getArticleFileNames();
  const articles = await generateArticleListWith(
    articleFileNames,
    (_, frontmatter) => frontmatter.tags.includes(tag),
  );

  return (
    <div>
      <h1 className="text-4xl border-b border-gray-200 py-4 text-base-content font-bold">
        Entries tagged with &quot;{tag}&quot;
      </h1>
      <ArticleList articles={articles} className="mt-4" />
    </div>
  );
}

export async function generateStaticParams() {
  const articleFileNames = await getArticleFileNames();
  const tags = await generateTagList(articleFileNames);

  return tags.map((tag) => {
    return {
      tag: tag.forPath,
    };
  });
}
