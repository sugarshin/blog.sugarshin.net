import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import SideMenu, { SideMenuData } from '~/components/SideMenu';
import ThemeController from '~/components/ThemeController';
import UrlChangeListener from '~/components/UrlChangeListener';
import {
  generateArchiveMonths,
  generateRecentPosts,
  generateTagList,
  getArticleFileNames,
} from '~/libs/article';
import { SITE_TITLE } from '~/libs/constants';
import './globals.css';

const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN;

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_TITLE}`,
    default: SITE_TITLE,
  },
  description: "Shingo Sato's blog",
  alternates: {
    canonical: `${APP_ORIGIN}/`,
    types: {
      'application/rss+xml': `${APP_ORIGIN}/rss.xml`,
      'application/atom+xml': `${APP_ORIGIN}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    url: `${APP_ORIGIN}/`,
    title: SITE_TITLE,
    siteName: SITE_TITLE,
    description: "Shingo Sato's blog",
    images: [{ url: 'https://sugarshin.net/images/s.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sugarshin',
    creator: '@sugarshin',
    title: SITE_TITLE,
    description: "Shingo Sato's blog",
    images: [{ url: 'https://sugarshin.net/images/s.png' }],
  },
  appleWebApp: {
    capable: true,
    title: SITE_TITLE,
  },
};

export const viewport: Viewport = {
  themeColor: 'oklch(var(--b1))',
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
        <Header title={SITE_TITLE} />
        <div className="drawer drawer-end lg:drawer-open bg-base-100 text-base-content">
          <input id="main-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center">
            <main className="p-4 container">{children}</main>
          </div>
          <SideMenu data={sideMenuData} />
        </div>
        <Footer />
        <Suspense>
          <UrlChangeListener />
          <ThemeController />
        </Suspense>
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
