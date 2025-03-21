'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ArticleList from '~/components/ArticleList';
import ArticleListSkeleton from '~/components/ArticleListSkeleton';
import ErrorComponent from '~/components/Error';
import Pagination, {
  calcPageCount,
  sliceByPage,
} from '~/components/Pagination';
import {
  generateArticleListFromGitHub,
  sortArticleFilesByDescDate,
} from '~/libs/article-client';
import { ArticleListItem } from '~/types';
import NoResultsFound from './no-results-found';

async function fetchSearchResults(q: string): Promise<ArticleListItem[]> {
  const apiOrigin = process.env.NEXT_PUBLIC_API_ORIGIN.replace(/\/$/, '');
  const res = await fetch(`${apiOrigin}/api/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
    },
    body: JSON.stringify({ q }),
  });
  const data = await res.json();
  const sortedFileNames = sortArticleFilesByDescDate(data.data);
  const ret = await generateArticleListFromGitHub(sortedFileNames);
  return ret;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const p = searchParams.get('p');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<Error>();
  const [articles, setArticles] = useState<ArticleListItem[]>([]);

  useEffect(() => {
    setIsLoading(true);
    if (!q) {
      setIsLoading(false);
      return;
    }
    const request = async () => {
      let res: ArticleListItem[] = [];
      try {
        res = await fetchSearchResults(q);
      } catch (error) {
        console.error(error);
        const e =
          error instanceof Error ? error : new Error('Unexpected error');
        setHttpError(e);
      }
      setArticles(res);
      setIsLoading(false);
    };
    request();
  }, [q]);

  if (isLoading) {
    return <ArticleListSkeleton count={5} />;
  }

  if (httpError) {
    return <ErrorComponent error={httpError} />;
  }

  if (articles.length === 0) {
    return <NoResultsFound />;
  }

  const page = Number(p);
  const currentPage = isNaN(page) || page === 0 ? 1 : page;
  const pageCount = calcPageCount(articles);
  const sliced = sliceByPage(articles, currentPage);

  return (
    <>
      <ArticleList articles={sliced} className="mt-4" />
      <div className="text-center">
        <Pagination
          currentPage={currentPage}
          totalPages={pageCount}
          basePath={`/search/?q=${q}`}
          paging="searchParam"
          className="my-6"
        />
      </div>
    </>
  );
}
