import { ThreeBarsIcon } from '@primer/octicons-react';
import Link from 'next/link';

export default function Header({ title }: { title: string }) {
  return (
    <header className="navbar bg-base-100 shadow-xs">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          {title}
        </Link>
      </div>
      <div className="flex-none">
        <label
          htmlFor="main-drawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <ThreeBarsIcon />
        </label>
      </div>
    </header>
  );
}
