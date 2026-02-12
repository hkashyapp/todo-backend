import express from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from '../controllers/todoController.js';
import { apiMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(apiMiddleware);

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;