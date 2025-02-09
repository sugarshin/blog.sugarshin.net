import fs from 'node:fs/promises';
import path from 'node:path';
import dayjs from 'dayjs';
import {
  ArticleListItem,
  NormalizedFrontmatter,
  SideMenuArticleListItem,
  TagListItem,
} from '~/types';
import {
  generateArticlePath,
  sortArticleFilesByDescDate,
  truncateArticleByLength,
} from './article-client';
import {
  parseAndNormalizeFrontmatter,
  stripeMarkdownSyntaxAndFrontmatter,
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

function sortByFrequencyAndUnique(arr: string[]): string[] {
  const frequencyMap: Record<string, number> = {};

  for (const item of arr) {
    if (frequencyMap[item]) {
      frequencyMap[item]++;
    } else {
      frequencyMap[item] = 1;
    }
  }

  const sorted = arr.toSorted((a, b) => frequencyMap[b] - frequencyMap[a]);

  const uniqueArray = [];
  const seen = new Set();
  for (const item of sorted) {
    if (!seen.has(item)) {
      seen.add(item);
      uniqueArray.push(item);
    }
  }

  return uniqueArray;
}

export async function generateTagList(
  articleFileNames: string[],
): Promise<TagListItem[]> {
  const tags: string[] = [];

  for (const fileName of articleFileNames) {
    const md = await readArticleFile(fileName);
    const frontmatter = parseAndNormalizeFrontmatter(md);
    for (const tag of frontmatter.tags) {
      tags.push(tag);
    }
  }

  const uniqued = sortByFrequencyAndUnique(tags);

  const ret: TagListItem[] = [];
  for (const tag of uniqued) {
    ret.push({
      tag,
      forPath: joinSpaceToUnderscore(tag),
    });
  }
  return ret;
}

function joinSpaceToUnderscore(str: string): string {
  return str.replace(/\s/g, '_');
}

export async function getArticleFileNames(): Promise<string[]> {
  const articlesPath = path.join(process.cwd(), 'src', 'articles');
  const fileNames = await fs.readdir(articlesPath);
  return sortArticleFilesByDescDate(fileNames);
}

export async function generateRecentPosts(
  articleFileNames: string[],
): Promise<SideMenuArticleListItem[]> {
  const recets = sortArticleFilesByDescDate(articleFileNames).slice(0, 5);

  const ret: SideMenuArticleListItem[] = [];
  for (const fileName of recets) {
    const md = await readArticleFile(fileName);
    const frontmatter = parseAndNormalizeFrontmatter(md);

    ret.push({
      title: frontmatter.title,
      path: generateArticlePath(fileName),
    });
  }
  return ret;
}

// Read article file. return markdown string
export function readArticleFile(fileName: string): Promise<string> {
  const articlePath = path.join(process.cwd(), 'src', 'articles', fileName);
  return fs.readFile(articlePath, 'utf-8');
}

export async function generateArticleListWith(
  articleFileNames: string[],
  filter: (
    fileName: string,
    frontmatter: NormalizedFrontmatter,
  ) => boolean = () => true,
): Promise<ArticleListItem[]> {
  const ret: ArticleListItem[] = [];

  for (const fileName of articleFileNames) {
    const md = await readArticleFile(fileName);
    const frontmatter = parseAndNormalizeFrontmatter(md);

    if (!filter(fileName, frontmatter)) {
      continue;
    }

    const strippedMd = await stripeMarkdownSyntaxAndFrontmatter(md);

    ret.push({
      title: frontmatter.title,
      date: frontmatter.date,
      path: generateArticlePath(fileName),
      tags: frontmatter.tags,
      author: frontmatter.author,
      beginning: truncateArticleByLength(strippedMd, 100),
    });
  }

  return ret;
}
