import fs from 'node:fs/promises';
import path from 'node:path';
import dayjs from 'dayjs';
import { parseFrontmatter } from './markdown';

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

type RecentPostListItem = {
  title: string;
  path: string;
};

export async function generateRecentPosts(
  articleFileNames: string[],
): Promise<RecentPostListItem[]> {
  const recets = articleFileNames
    .toSorted((a, b) => {
      const [dateA] = a.split('_');
      const [dateB] = b.split('_');
      return dayjs(dateB).diff(dateA);
    })
    .slice(0, 5);

  const ret = [];
  for (const fileName of recets) {
    const articlePath = path.join(process.cwd(), 'src', 'articles', fileName);
    const md = await fs.readFile(articlePath, 'utf-8');
    const frontmatter = parseFrontmatter(md);

    const [date, title] = fileName.split('_');
    const [y, m, d] = date.split('-');

    ret.push({
      title: frontmatter.title,
      path: `/${y}/${m}/${d}/${title.replace(/\.mdx?$/, '')}/`,
    });
  }
  return ret;
}
