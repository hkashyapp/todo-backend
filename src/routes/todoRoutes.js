import express from 'express';
import {
    createTodo,
    getTodos,
    // getTodoById,
    updateTodo,
    deleteTodo
} from '../controllers/todoController.js';
// import { apiMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply middleware to all routes in this file
// router.use(apiMiddleware);

// Explicit route definitions
router.post("/", createTodo);
router.get("/", getTodos);
// router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;