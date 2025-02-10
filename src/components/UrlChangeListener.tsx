'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { closeSideMenu } from '~/libs/dom';

const listeners = [closeSideMenu];

export default function UrlChangeListener() {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    listeners.forEach((listener) => {
      listener();
    });
  }, [pathname, search]);
  return <></>;
}
