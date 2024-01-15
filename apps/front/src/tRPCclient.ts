import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../back/src/main'

const baseUrl = 'http://localhost:3000';

export const tRPC = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: baseUrl,
    }),
  ],
});