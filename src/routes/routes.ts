import { Router } from 'express';
import workoutController from '../controllers/workout.controller';

const api = Router();

api.use(workoutController);

export default api;
