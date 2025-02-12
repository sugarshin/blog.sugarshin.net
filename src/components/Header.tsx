import { ThreeBarsIcon } from '@primer/octicons-react';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header({ title }: { title: string }) {
  return (
    <header className="navbar bg-base-100 border-b border-gray-200 text-base-content">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          {title}
        </Link>
      </div>
      <div className="flex-none">
        <ThemeSwitcher className="hidden lg:block" />
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
