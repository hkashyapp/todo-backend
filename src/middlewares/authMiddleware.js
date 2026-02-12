import jwt from "jsonwebtoken";
import { error } from "../models/responsesModels/responseModel.js";
import { StatusCodes } from "http-status-codes";
import { JWTSecret } from "../config/index.js";

export const apiMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return error("Authorization token required.", StatusCodes.UNAUTHORIZED, res);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWTSecret);
        req.user = {
            id: decoded.id || decoded._id,
            role: decoded.role || "user",
        };
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return error("Access token expired. Please refresh your token.", StatusCodes.UNAUTHORIZED, res);
        }
        return error("Invalid token. Please login again.", StatusCodes.UNAUTHORIZED, res);
    }
};