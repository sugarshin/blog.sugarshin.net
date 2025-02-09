import { Suspense } from 'react';
import Header from './header';
import SearchResults from './results';

export default async function Page() {
  return (
    <Suspense>
      <Header />
      <SearchResults />
    </Suspense>
  );
}
