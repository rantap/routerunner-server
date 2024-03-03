import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const WorkoutSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  type: z.string(),
  date: z.coerce.date(),
  distance: z.instanceof(Prisma.Decimal, { message: "Field 'distance' must be a Decimal." }),
  duration: z.number().int(),
});

export type Workout = z.infer<typeof WorkoutSchema>;
