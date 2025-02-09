import type { EventContext } from '@cloudflare/workers-types';
import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/core';
import type { Env } from '../types';

export async function onRequestPost(context: EventContext<Env, '', unknown>) {
  let q = '';
  try {
    const text = await context.request.text();
    console.log('[LOG /api/search]: request body: ' + text);
    const json = JSON.parse(text);
    q = json.q;
  } catch (error) {
    console.error('ERROR /api/search]: ', JSON.stringify(error));
    return Response.json({ data: [], count: 0 });
  }

  if (typeof q !== 'string') {
    console.error('ERROR /api/search]: invalid request body');
    return Response.json({ data: [], count: 0 });
  }

  if (q === '') {
    return Response.json({ data: [], count: 0 });
  }

  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: context.env.GITHUB_APP_ID,
      installationId: context.env.GITHUB_APP_INSTALLATION_ID,
      privateKey: context.env.GITHUB_APP_PRIVATE_KEY,
    },
  });

  try {
    const res = await octokit.request('GET /search/code', {
      q: `${q}+in:file+path:src/articles+language:markdown+extension:md+repo:sugarshin/blog.sugarshin.net`,
      per_page: 100,
    });
    const fileNames = res.data.items.map((item) => item.name);
    return Response.json({ data: fileNames, count: res.data.total_count });
  } catch (error) {
    console.error('ERROR /api/search]: ', JSON.stringify(error));
    return Response.json({ data: [], count: 0 });
  }
}
