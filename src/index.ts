import express, { Express, Request, Response } from 'express';
import cors from 'cors';
//const { PrismaClient } = require('@prisma/client');
//const prisma = new PrismaClient();

const app: Express = express();
const port = 8001;

app.use(cors());

app.get('/test', (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'The API IS WORssKING' });
  } catch {
    res.status(500).json({ message: 'Error' });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
