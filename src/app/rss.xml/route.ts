import { rss } from '~/libs/rss';

export const dynamic = 'force-static';

export async function GET() {
  const feed = await rss();

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
