import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import api from './routes/routes';
import errorHandler from './middleware/errorHandler';

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(errorHandler);
app.use(api);

app.listen(port, () => console.log(`Server is running on port ${port}`));
