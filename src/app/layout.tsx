import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import ArchiveList from '~/components/ArchiveList';
import RecentPostList from '~/components/RecentPostList';
import { generateArchiveMonths, generateRecentPosts } from '~/libs/article';
import './globals.css';
import Footer from '~/components/Footer';
import Header from '~/components/Header';

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_TITLE}`,
    default: process.env.NEXT_PUBLIC_SITE_TITLE,
  },
  description: "Shingo Sato's blog",
};

// async function getArticleContent(filePath: string): Promise<string> {
//   const content = await fs.readFile(filePath, 'utf-8');
//   return content;
// }

type ArticleListItem = {
  title: string;
  path: string;
};

type TopData = {
  recentPosts: ArticleListItem[];
  archives: string[];
  // tags: string[];
};

export async function generateData(): Promise<TopData> {
  const articlesPath = path.join(process.cwd(), 'src', 'articles');
  const articleFileNames = await fs.readdir(articlesPath);

  return {
    recentPosts: await generateRecentPosts(articleFileNames),
    archives: generateArchiveMonths(articleFileNames),
    // tags:
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await generateData();

  return (
    <html lang="ja">
      <body>
        <div className="root">
          <Header />
          <div className="drawer drawer-end lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center shadow-xs">
              <main className="main p-4">{children}</main>
            </div>
            <div className="drawer-side shadow-xs lg:mt-[2px]">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="menu bg-base-100 text-base-content min-h-full w-80 p-4">
                <RecentPostList posts={data.recentPosts}></RecentPostList>
                <ArchiveList archives={data.archives}></ArchiveList>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
