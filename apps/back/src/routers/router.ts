import { router, publicProcedure } from '../tRPC/tRPC';
import { getUsersService } from '../services/service';

export const appRouter = router({
    getUsersService: publicProcedure.query(getUsersService),
});
