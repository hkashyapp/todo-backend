import { error } from "../models/responsesModels/responseModel.js";
import { StatusCodes } from "http-status-codes";

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return error("Access denied. No role assigned.", StatusCodes.FORBIDDEN, res);
        }

        if (!allowedRoles.includes(req.user.role)) {
            return error(
                `Access denied. Role '${req.user.role}' is not authorized for this resource.`,
                StatusCodes.FORBIDDEN,
                res
            );
        }

        next();
    };
};
