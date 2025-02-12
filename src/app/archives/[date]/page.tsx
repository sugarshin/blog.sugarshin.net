import dayjs from 'dayjs';
import type { Metadata, ResolvingMetadata } from 'next';
import ArticleList from '~/components/ArticleList';
import {
  generateArchiveMonths,
  generateArticleListWith,
  getArticleFileNames,
} from '~/libs/article';
import { SITE_TITLE } from '~/libs/constants';

const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN;

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

export async function generateMetadata(
  { params }: { params: Promise<{ date: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const date = (await params).date;
  const meta = await parent;

  return {
    metadataBase: new URL(APP_ORIGIN),
    title: `${date} | Archive List`,
    description: `${date} | Archive List | ${meta.description}`,
    alternates: {
      canonical: `/archives/${date}/`,
      types: meta.alternates?.types || undefined,
    },
    openGraph: {
      type: 'website',
      url: `/archives/${date}/`,
      title: `${date} | Archive List | ${SITE_TITLE}`,
      siteName: SITE_TITLE,
      description: `${date} | Archive List | ${meta.description}`,
      images: [{ url: 'https://sugarshin.net/images/s.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@sugarshin',
      creator: '@sugarshin',
      title: `${date} | Archive List | ${SITE_TITLE}`,
      description: `${date} | Archive List | ${meta.description}`,
      images: [{ url: 'https://sugarshin.net/images/s.png' }],
    },
    appleWebApp: {
      capable: true,
      title: SITE_TITLE,
    },
  };
}
