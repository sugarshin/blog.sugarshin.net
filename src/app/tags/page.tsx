import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { generateTagList, getArticleFileNames } from '~/libs/article';
import { SITE_TITLE } from '~/libs/constants';
import { TagListItem } from '~/types';

const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN;

type TagsData = {
  tags: TagListItem[];
};

async function generateData(): Promise<TagsData> {
  const articleFileNames = await getArticleFileNames();

  return {
    tags: await generateTagList(articleFileNames),
  };
}

export default async function Page() {
  const data = await generateData();

  return (
    <div>
      <h1 className="text-4xl border-b border-gray-200 py-4 text-base-content font-bold">
        Tags
      </h1>
      <div className="py-4">
        {data.tags.map((tag) => {
          return (
            <Link
              key={tag.forPath}
              className="btn mr-4 my-2"
              href={`/tags/${tag.forPath}/`}
            >
              {tag.tag}
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
    title: 'Tags',
    description: `Tags | ${meta.description}`,
    alternates: {
      canonical: '/tags/',
      types: meta.alternates?.types || undefined,
    },
    openGraph: {
      type: 'website',
      url: '/tags/',
      title: `Tags | ${SITE_TITLE}`,
      siteName: SITE_TITLE,
      description: `Tags | ${meta.description}`,
      images: [{ url: 'https://sugarshin.net/images/s.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@sugarshin',
      creator: '@sugarshin',
      title: `Tags | ${SITE_TITLE}`,
      description: `Tags | ${meta.description}`,
      images: [{ url: 'https://sugarshin.net/images/s.png' }],
    },
    appleWebApp: {
      capable: true,
      title: SITE_TITLE,
    },
  };
}
