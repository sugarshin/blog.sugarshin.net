'use client';

import { SearchIcon } from '@primer/octicons-react';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Fallback() {
  return (
    <div className="flex w-full flex-col">
      <div className="skeleton h-[17px] w-full my-[8px]"></div>
      <div className="skeleton h-[40px] w-full my-[16px]"></div>
    </div>
  );
}

export default function Search({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const searchParamsQ = searchParams.get('q');

  const [q, setQ] = useState(searchParamsQ || '');

  const router = useRouter();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/?q=${q}`);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };

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
      </li>
    </ul>
  );
}
