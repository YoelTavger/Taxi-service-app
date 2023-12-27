import cors from 'cors';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './routers/router';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});

const startServer = async () => {
  try {
    server.listen(port);
    console.log(`[ ready ] http://${host}:${port}`);
  } catch (error) {
    console.error('Error during server setup:', error);
    process.exit(1);
  }
};

startServer();
