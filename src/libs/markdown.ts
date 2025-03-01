import { remark } from 'remark';
import stripMarkdown from 'strip-markdown';
import { parse } from 'yaml';
import { Frontmatter } from '~/types';

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

export function parseFrontmatter(markdown: string): Frontmatter {
  const frontmatter = extractFrontmatter(markdown);
  return parse(frontmatter) as Frontmatter;
}

export async function stripeMarkdownSyntax(markdown: string): Promise<string> {
  const vfile = await remark().use(stripMarkdown).process(markdown);
  return vfile.toString();
}

export function stripeFrontmatter(markdown: string): string {
  const [, end] = findFrontmatterLineIndex(markdown);
  return markdown
    .split(/\n/)
    .slice(end + 2)
    .join('\n');
}

export function stripeMarkdownSyntaxAndFrontmatter(
  markdown: string,
): Promise<string> {
  return stripeMarkdownSyntax(stripeFrontmatter(markdown));
}
