import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

export default function Markdown({
  children,
}: Readonly<{
  children: string;
}>) {
  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm,
        remarkFrontmatter,
        [remarkToc, { heading: '目次' }],
      ]}
      rehypePlugins={[
        rehypeHighlight,
        rehypeSlug,
        [
          rehypeExternalLinks,
          { target: '_blank', rel: ['nofollow', 'noreferrer', 'noopener'] },
        ],
        rehypeRaw,
      ]}
      components={{
        a: (attrs) => {
          const props = { ...attrs };
          delete props.node;
          const href = props.href || '';
          return <Link {...props} href={href} />;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
