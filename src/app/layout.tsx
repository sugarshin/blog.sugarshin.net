import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faStrava,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThreeBarsIcon } from '@primer/octicons-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.SITE_TITLE}`,
    default: process.env.SITE_TITLE,
  },
  description: "Shingo Sato's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="root">
          <header className="navbar bg-base-100 shadow-xs">
            <div className="flex-1">
              <Link className="btn btn-ghost text-xl" href="/">
                {process.env.SITE_TITLE}
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
          <div className="drawer drawer-end lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center shadow-xs">
              <main className="main p-4">{children}</main>
            </div>
            <div className="drawer-side shadow-xs lg:mt-[2px]">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-100 text-base-content min-h-full w-80 p-4">
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
                <li>
                  <a>Sidebar Item 1</a>
                </li>
              </ul>
            </div>
          </div>
          <footer className="footer sm:footer-horizontal bg-base-100 text-base-content items-center p-4">
            <aside className="grid-flow-col items-center">
              <p>
                Copyright © {new Date().getFullYear()} sugarshin | Shingo Sato
                All rights reserved.
              </p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
              <Link
                href="https://github.com/sugarshin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="h-[1.25rem]" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/shingosato/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-[1.25rem]" />
              </Link>
              <Link
                href="https://x.com/sugarshin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faXTwitter} className="h-[1.25rem]" />
              </Link>
              <Link
                href="https://instagram.com/sugarshin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-[1.25rem]" />
              </Link>
              <Link
                href="https://www.facebook.com/sngsato"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} className="h-[1.25rem]" />
              </Link>
              <Link
                href="https://www.strava.com/athletes/sugarshin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faStrava} className="h-[1.25rem]" />
              </Link>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  );
}
