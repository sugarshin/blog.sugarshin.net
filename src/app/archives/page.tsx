import dayjs from 'dayjs';
import Link from 'next/link';
import { generateArchiveMonths, getArticleFileNames } from '~/libs/article';

type ArchivesData = {
  archives: string[];
};

export async function generateData(): Promise<ArchivesData> {
  const articleFileNames = await getArticleFileNames();
  return {
    archives: generateArchiveMonths(articleFileNames),
  };
}

export default async function Page() {
  const data = await generateData();

  return (
    <div>
      <h1 className="text-4xl border-b border-gray-200 py-4 text-base-content font-bold">
        Archive List
      </h1>
      <div className="py-4">
        {data.archives.map((date) => {
          return (
            <Link
              key={date}
              className="btn mr-4 my-2"
              href={`/archives/${date}`}
            >
              {dayjs(date).format('MMMM, YYYY')}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
