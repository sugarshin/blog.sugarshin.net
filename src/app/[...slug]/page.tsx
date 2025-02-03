import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next'

type Frontmatter = {
  title: string;
  date: string
  description?: string;
  public: boolean;
  author: {
    name: string;
    url: string;
  }
  tags: string; // joind with ', '
  ogp: {
    og: {
      image: {
        src: string;
      }
    }
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const [y, m, d, t] = slug;
  const { default: Article } = await import(`~/articles/${y}-${m}-${d}_${t}.mdx`);

  return (
    <div className="markdown-body">
      <Article />
    </div>
  );
}

export async function generateStaticParams() {
  const articlesPath = path.join(process.cwd(), "src", "articles");
  const articleFileNames = await fs.readdir(articlesPath);
  return articleFileNames.map(fileName => {
    const [date, title] = fileName.split("_");
    const [y, m, d] = date.split("-");
    return {
      slug: [y, m, d, title.replace(/\.mdx$/, "")],
    };
  });
}

export async function generateMetadata({ params, ...b }: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const slug = (await params).slug
  const [y, m, d, t] = slug;
  const { frontmatter }: { frontmatter: Frontmatter } = await import(`~/articles/${y}-${m}-${d}_${t}.mdx`);

  return {
    metadataBase: new URL("https://blog.sugarshin.net"),
    title: `${frontmatter.title} | `,
    description: frontmatter.description || "Blog",
    authors: frontmatter.author,
    keywords: frontmatter.tags,
    publisher: frontmatter.author.name,
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [{ url: frontmatter.ogp.og.image.src }],
      url: `/${y}/${m}/${d}/${t}`,
    },
    twitter: {
      card: "summary_large_image",
      site: "@sugarshin",
      creator: "@sugarshin",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [{ url: frontmatter.ogp.og.image.src }],
    },
    appleWebApp: {
      capable: true,
      title: "blog.sugarshin.net",      
    },   
  }
}

export const dynamicParams = false;
