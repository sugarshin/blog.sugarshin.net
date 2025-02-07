import { ThreeBarsIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { SITE_TITLE } from '~/libs/constants';

export default function Header() {
  return (
    <header className="navbar bg-base-100 shadow-xs">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          {SITE_TITLE}
        </Link>
      </div>
      <div className="flex-none">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <ThreeBarsIcon />
        </label>
      </div>
    </header>
  );
}
