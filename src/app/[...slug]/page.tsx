import type { Metadata, ResolvingMetadata } from 'next';
import ArticleMeta, { ArticleMetaData } from '~/components/ArticleMeta';
import Markdown from '~/components/Markdown';
import SocialShare from '~/components/SocialShare';
import TwitterWidget from '~/components/TwitterWidget';
import { getArticleFileNames, readArticleFile } from '~/libs/article';
import { truncateArticleByLength } from '~/libs/article-client';
import { SITE_TITLE } from '~/libs/constants';
import {
  parseFrontmatter,
  stripeMarkdownSyntaxAndFrontmatter,
} from '~/libs/markdown';

const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const [y, m, d, t] = slug;
  const md = await readArticleFile(`${y}-${m}-${d}_${t}.md`);
  const frontmatter = parseFrontmatter(md);

  const meta: ArticleMetaData = {
    tags: frontmatter.tags,
    author: frontmatter.author,
    date: frontmatter.date,
  };

  return (
    <div>
      <h1 className="text-4xl border-b border-gray-200 py-4 text-base-content font-bold">
        {frontmatter.title}
      </h1>
      <ArticleMeta meta={meta} />
      <div
        className="markdown-body py-4 px-2 border-t border-gray-200"
        id="article-content"
      >
        <Markdown>{md}</Markdown>
        <TwitterWidget />
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
      slug: [y, m, d, title.replace(/\.md$/, '')],
    };
  });
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = (await params).slug;
  const [y, m, d, t] = slug;
  const md = await readArticleFile(`${y}-${m}-${d}_${t}.md`);
  const frontmatter = parseFrontmatter(md);
  const description = truncateArticleByLength(
    await stripeMarkdownSyntaxAndFrontmatter(md),
    100,
  );

  return {
    metadataBase: new URL(APP_ORIGIN),
    title: frontmatter.title,
    description,
    authors: frontmatter.author,
    keywords: frontmatter.tags.join(','),
    publisher: frontmatter.author.name,
    alternates: {
      canonical: `/${y}/${m}/${d}/${t}/`,
      types: (await parent).alternates?.types || undefined,
    },
    openGraph: {
      type: 'article',
      title: `${frontmatter.title} | ${SITE_TITLE}`,
      description,
      images: [{ url: frontmatter.ogp.og.image.src }],
      url: `/${y}/${m}/${d}/${t}/`,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@sugarshin',
      creator: '@sugarshin',
      title: `${frontmatter.title} | ${SITE_TITLE}`,
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
