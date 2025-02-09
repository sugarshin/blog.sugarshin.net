'use client';

import { SearchIcon } from '@primer/octicons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export default function NoResultsFound() {
  const searchParams = useSearchParams();
  const searchParamsQ = searchParams.get('q');
  const router = useRouter();
  const [q, setQ] = useState(searchParamsQ || '');

  const handleSearch = useCallback(() => {
    router.push(`/search?q=${q}`);
  }, [router, q]);

  const ref = useHotkeys('mod+return', handleSearch, {
    enableOnFormTags: ['input'],
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">No Search Results Found</h1>
          <p className="py-6">
            <span>Try again with other words.</span>
          </p>
          <p>
            <label className="input">
              <SearchIcon />
              <input
                ref={ref}
                type="search"
                className="grow"
                placeholder="Search"
                value={q}
                onChange={handleInput}
              />
              <kbd className="kbd kbd-sm">⌘</kbd>
              <kbd className="kbd kbd-sm">return</kbd>
            </label>
          </p>
        </div>
      </div>
    </div>
  );
}
