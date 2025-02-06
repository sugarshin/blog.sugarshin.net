import type { Metadata, ResolvingMetadata } from 'next';
import ArticleMeta from '~/components/ArticleMeta';
import SocialShare from '~/components/SocialShare';
import { getArticleFileNames } from '~/libs/article';
import { APP_ORIGIN, SITE_TITLE } from '~/libs/constants';
import { normalizeTags } from '~/libs/markdown';
import type { Frontmatter, ArticleMeta as TArticleMeta } from '~/types';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const [y, m, d, t] = slug;
  const { default: MDXComponent, frontmatter } = await import(
    `~/articles/${y}-${m}-${d}_${t}.mdx`
  );
  const meta: TArticleMeta = {
    tags: normalizeTags(frontmatter.tags),
    author: frontmatter.author,
    date: frontmatter.date,
  };

  return (
    <div>
      <h1 className="text-4xl border-b border-gray-200 py-4 text-base-content font-bold">
        {frontmatter.title}
      </h1>
      <ArticleMeta meta={meta} />
      <div className="markdown-body pt-4 border-t border-gray-200">
        <MDXComponent />
      </div>
      <SocialShare url={`${APP_ORIGIN}/${y}/${m}/${d}/${t}/`} />
    </div>
  );
}

export async function generateStaticParams() {
  const articleFileNames = await getArticleFileNames();
  return articleFileNames.map((fileName) => {
    const [date, title] = fileName.split('_');
    const [y, m, d] = date.split('-');
    return {
      slug: [y, m, d, title.replace(/\.mdx?$/, '')],
    };
  });
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = (await params).slug;
  const [y, m, d, t] = slug;
  const { frontmatter }: { frontmatter: Frontmatter } = await import(
    `~/articles/${y}-${m}-${d}_${t}.mdx`
  );

  // TODO:
  const description =
    frontmatter.description || (await parent).description || 'Blog';

  return {
    metadataBase: new URL(APP_ORIGIN),
    title: frontmatter.title,
    description,
    authors: frontmatter.author,
    keywords: frontmatter.tags,
    publisher: frontmatter.author.name,
    openGraph: {
      type: 'article',
      title: `${frontmatter.title} | ${process.env.SITE_TITLE}`,
      description,
      images: [{ url: frontmatter.ogp.og.image.src }],
      url: `/${y}/${m}/${d}/${t}/`,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@sugarshin',
      creator: '@sugarshin',
      title: `${frontmatter.title} | ${process.env.SITE_TITLE}`,
      description,
      images: [{ url: frontmatter.ogp.og.image.src }],
    },
    appleWebApp: {
      capable: true,
      title: SITE_TITLE,
    },
  };
}

export const dynamicParams = false;
