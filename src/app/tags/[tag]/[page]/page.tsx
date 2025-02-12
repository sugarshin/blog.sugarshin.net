import type { Metadata, ResolvingMetadata } from 'next';
import ArticleList from '~/components/ArticleList';
import Pagination, {
  calcPageCount,
  sliceByPage,
} from '~/components/Pagination';
import { generateArticleListWith, getArticleFileNames } from '~/libs/article';
import { SITE_TITLE } from '~/libs/constants';

const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN;

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
          basePath={`/tags/${forPathTag}/`}
          className="my-6"
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

export async function generateMetadata(
  { params }: { params: Promise<{ tag: string; page: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.tag;
  const page = resolvedParams.page;
  const resolvedMeta = await parent;
  const title = `Page ${page} | ${resolvedMeta.title?.absolute || SITE_TITLE}`;
  const url = `/tags/${tag}/${page}/`;
  const description = `Page ${page} | ${resolvedMeta.description}`;

  return {
    metadataBase: new URL(APP_ORIGIN),
    title,
    description,
    alternates: {
      canonical: url,
      types: resolvedMeta.alternates?.types || undefined,
    },
    openGraph: {
      type: 'website',
      url,
      title,
      siteName: SITE_TITLE,
      description,
      images: [{ url: 'https://sugarshin.net/images/s.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@sugarshin',
      creator: '@sugarshin',
      title,
      description,
      images: [{ url: 'https://sugarshin.net/images/s.png' }],
    },
    appleWebApp: {
      capable: true,
      title: SITE_TITLE,
    },
  };
}
