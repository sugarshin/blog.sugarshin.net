import {
  faFacebook,
  faGithub,
  faInstagram,
  faKeybase,
  faLinkedin,
  faStrava,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-100 text-base-content items-center p-4 border-t border-gray-200">
      <aside className="grid-flow-col items-center">
        <p>
          Copyright © {new Date().getFullYear()} sugarshin | Shingo Sato All
          rights reserved.
        </p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link
          href="https://github.com/sugarshin/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="GitHub"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
        </Link>
        <Link
          href="https://www.linkedin.com/in/shingosato/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
        </Link>
        <Link
          href="https://x.com/sugarshin/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="X"
        >
          <FontAwesomeIcon
            icon={faXTwitter}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
        </Link>
        <Link
          href="https://instagram.com/sugarshin"
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="Instagram"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
        </Link>
        <Link
          href="https://www.facebook.com/sngsato"
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="Facebook"
        >
          <FontAwesomeIcon
            icon={faFacebook}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
        </Link>
        <Link
          href="https://keybase.io/sugarshin"
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="Keybase"
        >
          <FontAwesomeIcon
            icon={faKeybase}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
        </Link>
        <Link
          href="https://www.strava.com/athletes/sugarshin"
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="Strava"
        >
          <FontAwesomeIcon
            icon={faStrava}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
        </Link>
      </nav>
    </footer>
  );
}
