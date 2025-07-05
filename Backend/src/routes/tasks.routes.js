import express from 'express';
import { getAllTasks } from '../controller/tasks.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const tasksRouter = express.Router();

// secure routes
tasksRouter.get('/getAllTasks', verifyJWT, getAllTasks);

export default tasksRouter;