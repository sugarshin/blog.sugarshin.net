import type { Metadata } from 'next';
import ArchiveList from '~/components/ArchiveList';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import LinkList from '~/components/LinkList';
import RecentPostList from '~/components/RecentPostList';
import SideMenuTagList from '~/components/SideMenuTagList';
import {
  generateArchiveMonths,
  generateRecentPosts,
  generateTagList,
  getArticleFileNames,
} from '~/libs/article';
import { SideMenuArticleListItem, TagListItem } from '~/types';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_TITLE}`,
    default: process.env.NEXT_PUBLIC_SITE_TITLE,
  },
  description: "Shingo Sato's blog",
};

type TopData = {
  recentPosts: SideMenuArticleListItem[];
  archives: string[];
  tags: TagListItem[];
};

export async function generateData(): Promise<TopData> {
  const articleFileNames = await getArticleFileNames();

  return {
    recentPosts: await generateRecentPosts(articleFileNames),
    archives: generateArchiveMonths(articleFileNames).slice(0, 5),
    tags: (await generateTagList(articleFileNames)).slice(0, 5),
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
      <body className="antialiased text-base-content">
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
                <ArchiveList
                  archives={data.archives}
                  className="mt-4"
                ></ArchiveList>
                <SideMenuTagList
                  list={data.tags}
                  className="mt-4"
                ></SideMenuTagList>
                <LinkList className="mt-4" />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
