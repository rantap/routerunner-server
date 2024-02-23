import { Router, Request, Response, NextFunction } from 'express';
import { Workout } from '@prisma/client';
import {
  addWorkout,
  deleteWorkout,
  editWorkout,
  findWorkoutById,
  getPaginatedWorkouts,
} from '../services/workout.service';

const router = Router();

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
    const { type, date, distance, duration } = req.body as Workout;
    const newWorkout = { type: type, date: date, distance: distance, duration: duration };
    const workout = await addWorkout(newWorkout);
    res.status(201).json(workout);
  } catch (err) {
    next(err);
  }
});

// Update workout
router.put('/workouts/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, date, distance, duration } = req.body as Workout;
    const newWorkout = { type: type, date: date, distance: distance, duration: duration };
    const id: number = Number(req.params.id);
    const workout = await editWorkout(id, newWorkout);
    res.status(200).json(workout);
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
