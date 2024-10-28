import { z } from 'zod';

export const WorkoutSchema = z.object({
	type: z.string(),
	date: z.coerce.date(),
	distance: z.number(),
	duration: z.number().int(),
});

export type Workout = z.infer<typeof WorkoutSchema>;
