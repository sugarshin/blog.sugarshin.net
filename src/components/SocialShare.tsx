import {
  faFacebook,
  faGetPocket,
  faTumblr,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

function objectToGetParams(object: {
  [key: string]: string | number | undefined | null;
}): string {
  const params = Object.entries(object).map(
    ([key, value]) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
  );

  return params.length > 0 ? `?${params.join('&')}` : '';
}

export default function SocialShare({ url }: { url: string }) {
  const fbUrl =
    'https://www.facebook.com/sharer/sharer.php' +
    objectToGetParams({ u: url });
  const xUrl = 'https://twitter.com/intent/tweet' + objectToGetParams({ url });
  const tUrl =
    'https://www.tumblr.com/widgets/share/tool' +
    objectToGetParams({ canonicalUrl: url });
  const pUrl = 'https://getpocket.com/save' + objectToGetParams({ url });

  return (
    <div className="flex gap-4 justify-center py-6 my-6">
      <Link
        href={fbUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="btn btn-circle"
      >
        <FontAwesomeIcon icon={faFacebook} className="h-[1.25rem]" />
      </Link>
      <Link
        href={xUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="btn btn-circle"
      >
        <FontAwesomeIcon icon={faXTwitter} className="h-[1.25rem]" />
      </Link>
      <Link
        href={tUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="btn btn-circle"
      >
        <FontAwesomeIcon icon={faTumblr} className="h-[1.25rem]" />
      </Link>
      <Link
        href={pUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="btn btn-circle"
      >
        <FontAwesomeIcon icon={faGetPocket} className="h-[1.25rem]" />
      </Link>
    </div>
  );
}
