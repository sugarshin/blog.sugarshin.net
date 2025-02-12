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

export async function generateMetadata(
  { params }: { params: Promise<{ page: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const page = (await params).page;
  const meta = await parent;

  const title = `Page ${page} | Articles | ${SITE_TITLE}`;
  const description = `Page ${page} | Articles | ${meta.description}`;
  const url = `/page/${page}/`;

  return {
    metadataBase: new URL(APP_ORIGIN),
    title: `Page ${page} | Articles`,
    description,
    alternates: {
      canonical: url,
      types: meta.alternates?.types || undefined,
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
