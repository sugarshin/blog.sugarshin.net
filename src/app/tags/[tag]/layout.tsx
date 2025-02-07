import { generateTagList, getArticleFileNames } from '~/libs/article';

export async function generateStaticParams() {
  const articleFileNames = await getArticleFileNames();
  const tags = await generateTagList(articleFileNames);

  return tags.map((tag) => {
    return {
      tag: tag.forPath,
    };
  });
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
