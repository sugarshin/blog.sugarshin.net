import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
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
      rehypePlugins={[rehypeHighlight, rehypeSlug]}
    >
      {children}
    </ReactMarkdown>
  );
}
