import fs from 'node:fs/promises';
import { Feed } from 'feed';
import {
  generateArticlePath,
  getArticleFileNames,
  readArticleFile,
  truncateArticleByLength,
} from '~/libs/article';
import { APP_ORIGIN, SITE_TITLE } from '~/libs/constants';
import {
  parseAndNormalizeFrontmatter,
  stripeMarkdownSyntaxAndFrontmatter,
} from '~/libs/markdown';

async function generateRss() {
  const feed = new Feed({
    title: SITE_TITLE,
    description: "Shingo Sato's blog",
    id: APP_ORIGIN,
    link: APP_ORIGIN,
    language: 'ja',
    copyright: `Copyright © ${new Date().getFullYear()} sugarshin | Shingo Sato All rights reserved.`,
    favicon: `${APP_ORIGIN}/favicon.ico`,
    author: {
      name: 'Shingo Sato',
      email: 'shinsugar@gmail.com',
      link: 'https://sugarshin.net',
    },
  });

  const articleFileNames = await getArticleFileNames();

  for (const fileName of articleFileNames) {
    const md = await readArticleFile(fileName);
    const frontmatter = parseAndNormalizeFrontmatter(md);
    const strippedMd = await stripeMarkdownSyntaxAndFrontmatter(md);
    const path = generateArticlePath(fileName);

    feed.addItem({
      title: frontmatter.title,
      id: `${APP_ORIGIN}${path}`,
      link: `${APP_ORIGIN}${path}`,
      date: new Date(frontmatter.date),
      description: truncateArticleByLength(strippedMd, 100),
    });
  }

  // console.log(feed.rss2());
  // console.log(feed.atom1());
  const DIST_DIR = 'out';
  const rssPath = `${process.cwd()}/${DIST_DIR}/rss.xml`;
  const feedPath = `${process.cwd()}/${DIST_DIR}/feed.xml`;
  await fs.writeFile(rssPath, feed.rss2());
  await fs.writeFile(feedPath, feed.atom1());
}

generateRss();
