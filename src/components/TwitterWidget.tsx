'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function TwitterWidget() {
  const pathname = usePathname();

  useEffect(() => {
    window.twttr?.widgets.load(
      document.getElementById('article-content') || undefined,
    );
  }, [pathname]);

  return <></>;
}
