import express, { Express, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';
import { Decimal } from '@prisma/client/runtime/library';

const app: Express = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ errors: [{ message: 'Something went wrong' }] });
};

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(errorHandler);

// Connection test
app.get('/test', (req, res, next) => {
  try {
    res.status(200).json({ message: 'The API IS WORKING' });
  } catch (err) {
    next(err);
  }
});

// Get all workouts
app.get('/workouts', async (req, res, next) => {
  try {
    const workouts = await prisma.workout.findMany();
    res.status(200).json(workouts);
  } catch (err) {
    next(err);
  }
});

// Get workout by id
app.get('/workouts/:id', async (req, res, next) => {
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
app.post('/workouts', async (req, res, next) => {
  try {
    const workout = await addWorkout(req.body.type, req.body.length, req.body.time);
    res.status(201).json(workout);
  } catch (err) {
    next(err);
  }
});

const addWorkout = async (type: string, length: number, time: string) => {
  const workout = await prisma.workout.create({
    data: {
      type: type,
      length: length,
      time: time,
    },
  });
  return workout;
};

// Delete a workout
app.delete('/workouts/:id', async (req, res, next) => {
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

app.listen(port, () => console.log(`Server is running on port ${port}`));
