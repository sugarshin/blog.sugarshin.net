'use client';

import { useSearchParams } from 'next/navigation';

export default function Header() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  return (
    <h1 className="text-4xl border-b border-gray-200 py-4 text-base-content font-bold">
      Search results: &quot;{q}&quot;
    </h1>
  );
}
