import jwt from "jsonwebtoken";
import { error } from "../models/responsesModels/responseModel.js";
import { StatusCodes } from "http-status-codes";
import { JWTSecret } from "../config/index.js";

export const apiMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, JWTSecret, (err, decoded) => {
            if (err) {
                return error("Session expired. Please login again.", StatusCodes.UNAUTHORIZED, res, err);
            }
            req.user = { id: decoded.id || decoded._id };

            next();
        });
    } else {
        return error("Authorization token required.", StatusCodes.UNAUTHORIZED, res);
    }
};