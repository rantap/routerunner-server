import { Router, Request, Response, NextFunction } from 'express';
import { WorkoutSchema } from '../schema';
import {
  addWorkout,
  deleteWorkout,
  editWorkout,
  findWorkoutById,
  getPaginatedWorkouts,
  getTotals,
} from '../services/workout.service';

const router = Router();

interface DateQuery {
  start: string;
  end: string;
}

// Connection test
router.get('/test', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: 'The API IS WORKING' });
  } catch (err) {
    next(err);
  }
});

// Get paginated workouts
router.get('/workouts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentPageNumber: number = Number(req.query.page);
    const resultsPerPage: number = Number(req.query.results);
    const workouts = await getPaginatedWorkouts(currentPageNumber, resultsPerPage);
    res.status(200).json(workouts);
  } catch (err) {
    next(err);
  }
});

// Get total workout calculations
router.get(
  '/total',
  async (req: Request<unknown, unknown, unknown, DateQuery>, res: Response, next: NextFunction) => {
    try {
      const { start, end } = req.query;
      const workouts = await getTotals(start, end);
      res.status(200).json(workouts);
    } catch (err) {
      next(err);
    }
  },
);

// Get workout by id
router.get('/workouts/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = Number(req.params.id);
    const workout = await findWorkoutById(id);
    res.status(200).json(workout);
  } catch (err) {
    next(err);
  }
});

// Add a workout
router.post('/workouts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workoutValidation = WorkoutSchema.safeParse(req.body);
    if (!workoutValidation.success) {
      res
        .status(400)
        .json({ message: 'Invalid request body', errors: workoutValidation.error.errors });
    } else {
      const { type, date, distance, duration } = workoutValidation.data;
      const newWorkout = { type, date, distance, duration };
      const workout = await addWorkout(newWorkout);
      res.status(201).json(workout);
    }
  } catch (err) {
    next(err);
  }
});

// Update workout
router.put('/workouts/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workoutValidation = WorkoutSchema.safeParse(req.body);
    if (!workoutValidation.success) {
      res
        .status(400)
        .json({ message: 'Invalid request body', errors: workoutValidation.error.errors });
    } else {
      const { type, date, distance, duration } = workoutValidation.data;
      const newWorkout = { type, date, distance, duration };
      const id: number = Number(req.params.id);
      const workout = await editWorkout(id, newWorkout);
      res.status(200).json(workout);
    }
  } catch (err) {
    next(err);
  }
});

// Delete a workout
router.delete('/workouts/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = Number(req.params.id);
    const workout = await deleteWorkout(id);
    res.status(200).json(workout);
  } catch (err) {
    next(err);
  }
});

export default router;
