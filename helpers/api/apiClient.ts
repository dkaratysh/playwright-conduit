import type { APIRequestContext } from '@playwright/test';

export function withAuth(request: APIRequestContext, token: string): APIRequestContext {
  return {
    ...request,
    fetch: (url, options = {}) =>
      request.fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Token ${token}`,
        },
      }),
  } as APIRequestContext;
}
