import { todoModel } from "../models/todoModel.js";
import { todoSchema } from "../utils/validationSchemas.js";
import { success, error, exception } from "../models/responsesModels/responseModel.js";
import { StatusCodes } from "http-status-codes";

export const createTodo = async (req, res) => {
    try {
        const validatedData = todoSchema.parse(req.body); 
        
        const todo = await todoModel.create({ 
            ...validatedData, 
            user: req.user.id 
        });
        
        return success("Todo created", todo, StatusCodes.CREATED, res, 5);
    } catch (err) {

        return exception(null, StatusCodes.BAD_REQUEST, res, err);
    }
};

export const getTodos = async (req, res) => {
    try {
        const todos = await todoModel.find({ user: req.user.id });
        return success("Todos retrieved", todos, StatusCodes.OK, res, 5);
    } catch (err) {
        return exception(null, StatusCodes.INTERNAL_SERVER_ERROR, res, err);
    }
};

export const updateTodo = async (req, res) => {
    try {
        const todo = await todoModel.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, // Ensures only owner can update
            req.body,
            { new: true }
        );
        if (!todo) return error("Todo not found", StatusCodes.NOT_FOUND, res);
        return success("Todo updated", todo, StatusCodes.OK, res, 5);
    } catch (err) {
        return exception(null, StatusCodes.BAD_REQUEST, res, err);
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const todo = await todoModel.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!todo) return error("Todo not found", StatusCodes.NOT_FOUND, res);
        return success("Todo deleted", {}, StatusCodes.OK, res, 5);
    } catch (err) {
        return exception(null, StatusCodes.BAD_REQUEST, res, err);
    }
};