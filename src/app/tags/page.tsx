import Link from 'next/link';
import { generateTagList, getArticleFileNames } from '~/libs/article';
import { TagListItem } from '~/types';

type TagsData = {
  tags: TagListItem[];
};

export async function generateData(): Promise<TagsData> {
  const articleFileNames = await getArticleFileNames();

  return {
    tags: await generateTagList(articleFileNames),
  };
}

export default async function Page() {
  const data = await generateData();

  return (
    <div>
      <h1 className="text-4xl border-b border-gray-200 py-4 text-base-content font-bold">
        Tags
      </h1>
      <div className="py-4">
        {data.tags.map((tag) => {
          return (
            <Link
              key={tag.forPath}
              className="btn mr-4 my-2"
              href={`/tags/${tag.forPath}`}
            >
              {tag.tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
