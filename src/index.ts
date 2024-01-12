import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import api from './routes/routes';

const app: Express = express();
const port = process.env.PORT || 3001;
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ errors: [{ message: 'Something went wrong' }] });
};

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(errorHandler);
app.use(api);

app.listen(port, () => console.log(`Server is running on port ${port}`));
