import { Router } from "express";
import authRoutes from './authRoutes.js';
import todoRoutes from './todoRoutes.js';

const api = Router();

// Define prefixes for your modules
api.use('/auth', authRoutes);
api.use('/todos', todoRoutes);

export default api;