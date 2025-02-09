'use client';

import { SearchIcon } from '@primer/octicons-react';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export default function Search({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const searchParamsQ = searchParams.get('q');

  const [q, setQ] = useState(searchParamsQ || '');

  const router = useRouter();

  const handleSearch = useCallback(() => {
    router.push(`/search?q=${q}`);
  }, [router, q]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };

  const ref = useHotkeys('mod+return', handleSearch, {
    enableOnFormTags: ['input'],
  });

  useEffect(() => {
    setQ(searchParamsQ || '');
  }, [searchParamsQ]);

  return (
    <ul className={clsx('list', 'rounded-box', 'shadow-xs', className)}>
      <li className="p-4 text-xs opacity-60 tracking-wide menu-title block">
        <SearchIcon className="inline-block mr-1" />
        <span className="uppercase">Search</span>
      </li>
      <li className="list-row">
        <label className="input input-sm">
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
      </li>
    </ul>
  );
}
