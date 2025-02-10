'use client';

import { SearchIcon } from '@primer/octicons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function NoResultsFound() {
  const searchParams = useSearchParams();
  const searchParamsQ = searchParams.get('q');
  const router = useRouter();
  const [q, setQ] = useState(searchParamsQ || '');

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/?q=${q}`);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">No Search Results Found</h1>
          <p className="py-6">
            <span>Try again with other words.</span>
          </p>
          <form className="p-0 m-0" onSubmit={handleSubmit}>
            <label className="input">
              <SearchIcon />
              <input
                type="search"
                className="grow"
                placeholder="Search"
                value={q}
                onChange={handleInput}
              />
              <kbd className="kbd kbd-sm">⏎</kbd>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
