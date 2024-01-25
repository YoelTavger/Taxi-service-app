import { router, publicProcedure } from '../tRPC/tRPC';
import {
  getTaxiByAvailabilityService,
  getTheNearestTaxiService,
} from '../services/service';
import { availabilitySchema, userLocationSchema } from '../zod/zodSchema';
import { z } from 'zod';

export const appRouter = router({
  getTaxiByAvailability: publicProcedure
    .input(availabilitySchema)
    .query(getTaxiByAvailabilityService),

  getTheNearestTaxi: publicProcedure
    .input(userLocationSchema)
    .query(getTheNearestTaxiService),
});
