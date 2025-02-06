import type { MetadataRoute } from 'next';
import {
  generateArchiveMonths,
  generateTagList,
  getArticleFileNames,
} from '~/libs/article';
import { APP_ORIGIN } from '~/libs/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapData = [];

  const indexPages = ['/', '/tags/', '/archives/'];

  const articleFileNames = await getArticleFileNames();
  const tags = await generateTagList(articleFileNames);
  const archives = generateArchiveMonths(articleFileNames);

  for (const page of indexPages) {
    sitemapData.push({
      url: `${APP_ORIGIN}${page}`,
    });
  }

  for (const articleFileName of articleFileNames) {
    const [date, title] = articleFileName.split('_');
    const [y, m, d] = date.split('-');
    sitemapData.push({
      url: `${APP_ORIGIN}/${y}/${m}/${d}/${title.replace(/\.mdx?/, '')}/`,
    });
  }

  for (const tag of tags) {
    sitemapData.push({
      url: `${APP_ORIGIN}/tags/${tag.forPath}/`,
    });
  }

  for (const archive of archives) {
    sitemapData.push({
      url: `${APP_ORIGIN}/archives/${archive}/`,
    });
  }

  return sitemapData;
}

export const dynamic = 'force-static';
