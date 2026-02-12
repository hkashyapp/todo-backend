import { Router } from "express";
import authRoutes from './authRoutes.js';
import todoRoutes from './todoRoutes.js';

const api = Router();

api.use('/auth', authRoutes);
api.use('/todos', todoRoutes);

export default api;