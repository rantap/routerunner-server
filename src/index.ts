import express, { Express, Request, Response, NextFunction } from 'express';
import type { ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
//const { PrismaClient } = require('@prisma/client');
//const prisma = new PrismaClient();

const app: Express = express();
const port = 8001;
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ errors: [{ message: 'Something went wrong' }] });
};

app.use(cors());
app.use(helmet());
app.use(errorHandler);

app.get('/test', (req, res, next) => {
  try {
    res.status(200).json({ message: 'The API IS WORKING' });
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
