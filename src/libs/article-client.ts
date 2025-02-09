import dayjs from 'dayjs';
import pMap, { pMapSkip } from 'p-map';
import { ArticleListItem } from '~/types';
import {
  parseAndNormalizeFrontmatter,
  stripeMarkdownSyntaxAndFrontmatter,
} from './markdown';

export function sortArticleFilesByDescDate(
  articleFileNames: string[],
): string[] {
  return articleFileNames.toSorted((a, b) => {
    const [dateA] = a.split('_');
    const [dateB] = b.split('_');
    return dayjs(dateB).diff(dateA);
  });
}

async function generateArticleListItem(
  fileName: string,
  markdown: string,
): Promise<ArticleListItem> {
  const frontmatter = parseAndNormalizeFrontmatter(markdown);
  const strippedMd = await stripeMarkdownSyntaxAndFrontmatter(markdown);
  return {
    title: frontmatter.title,
    date: frontmatter.date,
    path: generateArticlePath(fileName),
    tags: frontmatter.tags,
    author: frontmatter.author,
    beginning: truncateArticleByLength(strippedMd, 100),
  };
}

export function generateArticleListFromGitHub(
  fileNames: string[],
): Promise<ArticleListItem[]> {
  return pMap(
    fileNames,
    async (fileName) => {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/sugarshin/blog.sugarshin.net/main/src/articles/${fileName}`,
        );
        const text = await res.text();
        const item = await generateArticleListItem(fileName, text);
        return item;
      } catch (error) {
        console.error(error);
        return pMapSkip;
      }
    },
    { concurrency: 10 },
  );
}

// Article file path to URL path
export function generateArticlePath(fileName: string): string {
  const [date, title] = fileName.split('_');
  const [y, m, d] = date.split('-');
  return `/${y}/${m}/${d}/${title.replace(/\.md$/, '')}/`;
}

export function truncateArticleByLength(
  strippedMarkdown: string,
  length: number,
): string {
  return truncate(convertLineBreakToSpace(strippedMarkdown), length);
}

function truncate(str: string, len: number): string {
  return str.length <= len ? str : str.substring(0, len + 1) + '...';
}

function convertLineBreakToSpace(str: string): string {
  return str.replace(/\n/g, ' ');
}
