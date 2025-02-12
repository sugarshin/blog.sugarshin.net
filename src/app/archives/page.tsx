import dayjs from 'dayjs';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { generateArchiveMonths, getArticleFileNames } from '~/libs/article';
import { SITE_TITLE } from '~/libs/constants';

const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN;

type ArchivesData = {
  archives: string[];
};

async function generateData(): Promise<ArchivesData> {
  const articleFileNames = await getArticleFileNames();
  return {
    archives: generateArchiveMonths(articleFileNames),
  };
}

export default async function Page() {
  const data = await generateData();

  return (
    <div>
      <h1 className="text-4xl border-b border-gray-200 py-4 text-base-content font-bold">
        Archive List
      </h1>
      <div className="py-4">
        {data.archives.map((date) => {
          return (
            <Link
              key={date}
              className="btn mr-4 my-2"
              href={`/archives/${date}`}
            >
              {dayjs(date).format('MMMM, YYYY')}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export async function generateMetadata(
  _props: object,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const meta = await parent;

  return {
    metadataBase: new URL(APP_ORIGIN),
    title: 'Archive List',
    description: `Archive List | ${meta.description}`,
    alternates: {
      canonical: '/archives/',
      types: meta.alternates?.types || undefined,
    },
    openGraph: {
      type: 'website',
      url: '/archives/',
      title: `Archive List | ${SITE_TITLE}`,
      siteName: SITE_TITLE,
      description: `Archive List | ${meta.description}`,
      images: [{ url: 'https://sugarshin.net/images/s.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@sugarshin',
      creator: '@sugarshin',
      title: `Archive List | ${SITE_TITLE}`,
      description: `Archive List | ${meta.description}`,
      images: [{ url: 'https://sugarshin.net/images/s.png' }],
    },
    appleWebApp: {
      capable: true,
      title: SITE_TITLE,
    },
  };
}
