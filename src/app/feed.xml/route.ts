import { rss } from '~/libs/rss';

export const dynamic = 'force-static';

export async function GET() {
  const feed = await rss();

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
