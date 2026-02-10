import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import { registerSchema, loginSchema } from "../utils/validationSchemas.js";
import { successAuth, error, exception } from "../models/responsesModels/responseModel.js";
import { encryptPassword, checkPassword } from "../utils/authUtils.js";
import { StatusCodes } from "http-status-codes";
import { JWTSecret } from "../config/index.js";

export const register = async (req, res) => {
    try {
        const validated = registerSchema.parse(req.body);
        const userExists = await userModel.findOne({ email: validated.email });
        if (userExists) return error("Email already exists", StatusCodes.CONFLICT, res);

        const hashedPassword = await encryptPassword(validated.password);
        const user = await userModel.create({ ...validated, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, JWTSecret, { expiresIn: "1d" });

        return successAuth("Registration successful", token, { id: user._id, email: user.email }, StatusCodes.CREATED, res, 5);
    } catch (err) {
        return exception(null, StatusCodes.BAD_REQUEST, res, err);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = await userModel.findOne({ email });

        if (user && (await checkPassword(password, user.password))) {
            const token = jwt.sign({ id: user._id }, JWTSecret, { expiresIn: "1d" });
            return successAuth("Login successful", token, { id: user._id, email: user.email }, StatusCodes.OK, res, 5);
        }
        return error("Invalid email or password", StatusCodes.UNAUTHORIZED, res);
    } catch (err) {
        return exception(null, StatusCodes.BAD_REQUEST, res, err);
    }
};