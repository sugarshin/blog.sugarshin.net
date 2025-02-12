import type { Metadata, ResolvingMetadata } from 'next';
import { generateTagList, getArticleFileNames } from '~/libs/article';
import { SITE_TITLE } from '~/libs/constants';

const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN;

export async function generateStaticParams() {
  const articleFileNames = await getArticleFileNames();
  const tags = await generateTagList(articleFileNames);

  return tags.map((tag) => {
    return {
      tag: tag.forPath,
    };
  });
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export async function generateMetadata(
  { params }: { params: Promise<{ tag: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const tag = (await params).tag;
  const resolvedMeta = await parent;
  const title = `${tag} | Tags | ${SITE_TITLE}`;
  const description = `${tag} | Tags | ${resolvedMeta.description}`;
  const url = `/tags/${tag}/`;

  return {
    metadataBase: new URL(APP_ORIGIN),
    title: `${tag} | Tags`, // Resolve by parent template
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
