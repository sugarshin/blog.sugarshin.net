import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata, ResolvingMetadata } from 'next';

type Frontmatter = {
  title: string;
  date: string;

  // TODO:
  description?: string;
  public: boolean;
  author: {
    name: string;
    url: string;
  };
  tags: string; // joind with ', '
  ogp: {
    og: {
      image: {
        src: string;
      };
    };
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const [y, m, d, t] = slug;
  const { default: Article } = await import(
    `~/articles/${y}-${m}-${d}_${t}.mdx`
  );

  return (
    <div className="markdown-body">
      <Article />
    </div>
  );
}

export async function generateStaticParams() {
  const articlesPath = path.join(process.cwd(), 'src', 'articles');
  const articleFileNames = await fs.readdir(articlesPath);
  return articleFileNames.map((fileName) => {
    const [date, title] = fileName.split('_');
    const [y, m, d] = date.split('-');
    return {
      slug: [y, m, d, title.replace(/\.mdx$/, '')],
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
    metadataBase: new URL(process.env.APP_ORIGIN),
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
      url: `/${y}/${m}/${d}/${t}`,
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
      title: process.env.SITE_TITLE,
    },
  };
}

export const dynamicParams = false;
