import type { Metadata } from 'next';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import SideMenu, { SideMenuData } from '~/components/SideMenu';
import {
  generateArchiveMonths,
  generateRecentPosts,
  generateTagList,
  getArticleFileNames,
} from '~/libs/article';
import { APP_ORIGIN, SITE_TITLE } from '~/libs/constants';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_TITLE}`,
    default: SITE_TITLE,
  },
  description: "Shingo Sato's blog",
  alternates: {
    canonical: APP_ORIGIN,
    types: {
      'application/rss+xml': `${APP_ORIGIN}/rss.xml`,
      'application/atom+xml': `${APP_ORIGIN}/feed.xml`,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sideMenuData = await generateSideMenuData();

  return (
    <html lang="ja">
      <body className="antialiased text-base-content">
        <div className="root">
          <Header />
          <div className="drawer drawer-end lg:drawer-open">
            <input id="main-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center shadow-xs">
              <main className="main p-4">{children}</main>
            </div>
            <SideMenu data={sideMenuData} />
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

async function generateSideMenuData(): Promise<SideMenuData> {
  const articleFileNames = await getArticleFileNames();

  return {
    recentPosts: await generateRecentPosts(articleFileNames),
    archives: generateArchiveMonths(articleFileNames).slice(0, 5),
    tags: (await generateTagList(articleFileNames)).slice(0, 5),
  };
}
