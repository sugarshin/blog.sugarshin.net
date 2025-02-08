import type { Metadata } from 'next';
import ArticleMeta, { ArticleMetaData } from '~/components/ArticleMeta';
import Markdown from '~/components/Markdown';
import SocialShare from '~/components/SocialShare';
import {
  getArticleFileNames,
  readArticleFile,
  truncateArticleByLength,
} from '~/libs/article';
import { APP_ORIGIN, SITE_TITLE } from '~/libs/constants';
import {
  parseAndNormalizeFrontmatter,
  stripeMarkdownSyntaxAndFrontmatter,
} from '~/libs/markdown';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const [y, m, d, t] = slug;
  const md = await readArticleFile(`${y}-${m}-${d}_${t}.md`);
  const frontmatter = parseAndNormalizeFrontmatter(md);

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
      <div className="markdown-body pt-4 border-t border-gray-200">
        <Markdown>{md}</Markdown>
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

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const [y, m, d, t] = slug;
  const md = await readArticleFile(`${y}-${m}-${d}_${t}.md`);
  const frontmatter = parseAndNormalizeFrontmatter(md);
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
