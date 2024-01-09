import express, { Express, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';

const app: Express = express();
const prisma = new PrismaClient();
const port = 3001;
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ errors: [{ message: 'Something went wrong' }] });
};

app.use(cors());
app.use(helmet());
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

app.listen(port, () => console.log(`Server is running on port ${port}`));
