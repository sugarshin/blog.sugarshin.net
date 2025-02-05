import fs from 'node:fs/promises';
import path from 'node:path';
import dayjs from 'dayjs';
import { ArticleListItem, SideMenuArticleListItem } from '~/types';
import {
  normalizeTags,
  parseFrontmatter,
  stripeFrontmatter,
  stripeMarkdownSyntax,
} from './markdown';

// return ['2025-02', '2025-01', '2024-12, ...]
export function generateArchiveMonths(articleFileNames: string[]): string[] {
  return articleFileNames
    .map((fileName) => {
      const [date] = fileName.split('_');
      const [y, m] = date.split('-');
      return `${y}-${m}`;
    })
    .filter((value, index, self) => self.indexOf(value) === index)
    .toSorted((a, b) => dayjs(b).diff(a, 'month'));
}

function sortArticleFilesByDescDate(articleFileNames: string[]): string[] {
  return articleFileNames.toSorted((a, b) => {
    const [dateA] = a.split('_');
    const [dateB] = b.split('_');
    return dayjs(dateB).diff(dateA);
  });
}

export async function generateRecentPosts(
  articleFileNames: string[],
): Promise<SideMenuArticleListItem[]> {
  const recets = sortArticleFilesByDescDate(articleFileNames).slice(0, 5);

  const ret: SideMenuArticleListItem[] = [];
  for (const fileName of recets) {
    const articlePath = path.join(process.cwd(), 'src', 'articles', fileName);
    const md = await fs.readFile(articlePath, 'utf-8');
    const frontmatter = parseFrontmatter(md);

    ret.push({
      title: frontmatter.title,
      path: generateArticlePath(fileName),
    });
  }
  return ret;
}

// Article file path to URL path
function generateArticlePath(fileName: string): string {
  const [date, title] = fileName.split('_');
  const [y, m, d] = date.split('-');
  return `/${y}/${m}/${d}/${title.replace(/\.mdx?$/, '')}/`;
}

export async function generateArticleListAll(
  articleFileNames: string[],
): Promise<ArticleListItem[]> {
  const fileNames = sortArticleFilesByDescDate(articleFileNames);

  const ret: ArticleListItem[] = [];

  for (const fileName of fileNames) {
    const articlePath = path.join(process.cwd(), 'src', 'articles', fileName);
    const md = await fs.readFile(articlePath, 'utf-8');
    const frontmatter = parseFrontmatter(md);
    const stripedMd = await stripeMarkdownSyntax(stripeFrontmatter(md));

    ret.push({
      title: frontmatter.title,
      date: frontmatter.date,
      path: generateArticlePath(fileName),
      tags: normalizeTags(frontmatter.tags),
      author: frontmatter.author,
      beginning: truncate(convertLineBreakToSpace(stripedMd), 100),
    });
  }

  return ret;
}

function truncate(str: string, len: number): string {
  return str.length <= len ? str : str.substring(0, len + 1) + '...';
}

function convertLineBreakToSpace(str: string): string {
  return str.replace(/\n/g, ' ');
}
