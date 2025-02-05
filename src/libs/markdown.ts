import { parse } from 'yaml';

function findFrontmatterLineIndex(
  markdown: string,
  divider: string = '---',
): [number, number] {
  const rows = markdown.split(/\n/);
  const ret = [];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] === divider) {
      ret.push(i);
      if (ret.length === 2) {
        break;
      }
    }
  }
  return ret as [number, number];
}

export function extractFrontmatter(markdown: string): string {
  const [firstLineIndex, secondLineIndex] = findFrontmatterLineIndex(markdown);
  const rows = markdown.split(/\n/);
  return rows.slice(firstLineIndex, secondLineIndex).join('\n');
}

export function parseFrontmatter(markdown: string): Record<string, string> {
  const frontmatter = extractFrontmatter(markdown);
  return parse(frontmatter);
}

export function omitFrontmatter(markdown: string): string {
  const [, end] = findFrontmatterLineIndex(markdown);
  return markdown
    .split(/\n/)
    .slice(end + 2)
    .join('\n');
}
