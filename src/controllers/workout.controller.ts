import { Router, Request, Response, NextFunction } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { Workout } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Connection test
router.get('/test', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: 'The API IS WORKING' });
  } catch (err) {
    next(err);
  }
});

// Get all workouts
router.get('/workouts', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const workouts = await prisma.workout.findMany();
    res.status(200).json(workouts);
  } catch (err) {
    next(err);
  }
});

// Get workout by id
router.get('/workouts/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workout = await prisma.workout.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(workout);
  } catch (err) {
    next(err);
  }
});

// Add a workout
router.post('/workouts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, length, time } = req.body as Workout;
    const workout = await addWorkout(type, length, time);
    res.status(201).json(workout);
  } catch (err) {
    next(err);
  }
});

const addWorkout = async (type: string, length: Prisma.Decimal, time: number) => {
  const workout = await prisma.workout.create({
    data: {
      type: type,
      length: new Prisma.Decimal(length),
      time: time,
    },
  });
  return workout;
};

// Update workout
router.put('/workouts/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, length, time } = req.body as Workout;
    const workout = await prisma.workout.update({
      where: {
        id: Number(req.params.id),
      },
      data: { type: type, length: new Prisma.Decimal(length), time: time },
    });
    res.status(200).json(workout);
  } catch (err) {
    next(err);
  }
});

// Delete a workout
router.delete('/workouts/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workout = await prisma.workout.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(workout);
  } catch (err) {
    next(err);
  }
});

export default router;
