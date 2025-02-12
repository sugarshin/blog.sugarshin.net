import type { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';
import { SITE_TITLE } from '~/libs/constants';
import Header from './header';
import SearchResults from './results';

const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN;

export default async function Page() {
  return (
    <Suspense>
      <Header />
      <SearchResults />
    </Suspense>
  );
}

export async function generateMetadata(
  _props: object,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const meta = await parent;

  const title = `Search | ${SITE_TITLE}`;
  const description = `Search | ${meta.description}`;
  const url = '/search/';

  return {
    metadataBase: new URL(APP_ORIGIN),
    title: 'Search',
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
