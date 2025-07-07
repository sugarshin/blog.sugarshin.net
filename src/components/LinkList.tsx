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
import { GlobeIcon, LinkExternalIcon } from '@primer/octicons-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function LinkList({ className }: { className?: string }) {
  return (
    <ul className={clsx('list', 'rounded-box', 'shadow-xs', className)}>
      <li className="p-4 text-xs opacity-70 tracking-wide menu-title block">
        <LinkExternalIcon className="inline-block mr-1" />
        <span className="uppercase">Links</span>
      </li>
      <li className="list-row">
        <Link
          href="https://sugarshin.net/"
          className="list-col-grow"
          rel="nofollow noopener noreferrer"
        >
          <GlobeIcon className="w-[1.25rem] h-auto" />
          About
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://github.com/sugarshin/"
          className="list-col-grow"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
          GitHub
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://www.linkedin.com/in/shingosato/"
          className="list-col-grow"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
          LinkedIn
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://x.com/sugarshin/"
          className="list-col-grow"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faXTwitter}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
          X
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://instagram.com/sugarshin"
          className="list-col-grow"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
          Instagram
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://www.facebook.com/sngsato"
          className="list-col-grow"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faFacebook}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
          Facebook
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://keybase.io/sugarshin"
          className="list-col-grow"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faKeybase}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
          Keybase
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://www.strava.com/athletes/sugarshin"
          className="list-col-grow"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faStrava}
            className="h-[1.25rem]"
            aria-hidden="true"
          />
          Strava
        </Link>
      </li>
      <li className="list-row">
        <Link
          href="https://sauna-ikitai.com/saunners/66527"
          className="list-col-grow"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          サウナイキタイ
        </Link>
      </li>
    </ul>
  );
}
