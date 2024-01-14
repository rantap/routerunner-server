import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Connection test
router.get('/test', (req, res, next) => {
  try {
    res.status(200).json({ message: 'The API IS WORKING' });
  } catch (err) {
    next(err);
  }
});

// Get all workouts
router.get('/workouts', async (req, res, next) => {
  try {
    const workouts = await prisma.workout.findMany();
    res.status(200).json(workouts);
  } catch (err) {
    next(err);
  }
});

// Get workout by id
router.get('/workouts/:id', async (req, res, next) => {
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
router.post('/workouts', async (req, res, next) => {
  try {
    const workout = await addWorkout(req.body.type, req.body.length, req.body.time);
    res.status(201).json(workout);
  } catch (err) {
    next(err);
  }
});

const addWorkout = async (type: string, length: number, time: number) => {
  const workout = await prisma.workout.create({
    data: {
      type: type,
      length: length,
      time: time,
    },
  });
  return workout;
};

// Update workout
router.put('/workouts/:id', async (req, res, next) => {
  try {
    const { type, length, time } = req.body;
    const workout = await prisma.workout.update({
      where: {
        id: Number(req.params.id),
      },
      data: { type: type, length: length, time: time },
    });
    res.status(200).json(workout);
  } catch (err) {
    next(err);
  }
});

// Delete a workout
router.delete('/workouts/:id', async (req, res, next) => {
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
