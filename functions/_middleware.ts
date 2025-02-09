import { EventContext } from '@cloudflare/workers-types';
import type { Env } from './types';

export const onRequestOptions = async (
  context: EventContext<Env, '', unknown>,
) => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Origin': context.env.APP_ORIGIN,
      'Access-Control-Allow-Headers': '*',
    },
  });
};

export const onRequest = async (context: EventContext<Env, '', unknown>) => {
  const response = await context.next();
  response.headers.set('Access-Control-Allow-Origin', context.env.APP_ORIGIN);
  return response;
};
