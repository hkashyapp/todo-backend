import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import { registerSchema, loginSchema, refreshTokenSchema } from "../utils/validationSchemas.js";
import { successAuth, success, error, exception } from "../models/responsesModels/responseModel.js";
import { encryptPassword, checkPassword } from "../utils/authUtils.js";
import { StatusCodes } from "http-status-codes";
import { JWTSecret, JWTRefreshSecret, JWTExpiresIn, JWTRefreshExpiresIn } from "../config/index.js";


const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        JWTSecret,
        { expiresIn: JWTExpiresIn }
    );

    const refreshToken = jwt.sign(
        { id: user._id, role: user.role },
        JWTRefreshSecret,
        { expiresIn: JWTRefreshExpiresIn }
    );

    return { accessToken, refreshToken };
};

export const register = async (req, res) => {
    try {
        const validated = registerSchema.parse(req.body);

        const userExists = await userModel.findOne({ email: validated.email });
        if (userExists) {
            return error("Email already exists", StatusCodes.CONFLICT, res);
        }

        const hashedPassword = await encryptPassword(validated.password);
        const user = await userModel.create({
            ...validated,
            password: hashedPassword,
        });

        const { accessToken, refreshToken } = generateTokens(user);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await userModel.findByIdAndUpdate(user._id, { refreshToken: hashedRefreshToken });

        return successAuth(
            "Registration successful",
            accessToken,
            refreshToken,
            { id: user._id, email: user.email, fullName: user.fullName, role: user.role },
            StatusCodes.CREATED,
            res,
            5
        );
    } catch (err) {
        return exception(null, StatusCodes.BAD_REQUEST, res, err);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = await userModel.findOne({ email });

        if (!user || !(await checkPassword(password, user.password))) {
            return error("Invalid email or password", StatusCodes.UNAUTHORIZED, res);
        }

        // Generate tokens & store hashed refresh token
        const { accessToken, refreshToken } = generateTokens(user);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await userModel.findByIdAndUpdate(user._id, { refreshToken: hashedRefreshToken });

        return successAuth(
            "Login successful",
            accessToken,
            refreshToken,
            { id: user._id, email: user.email, fullName: user.fullName, role: user.role },
            StatusCodes.OK,
            res,
            5
        );
    } catch (err) {
        return exception(null, StatusCodes.BAD_REQUEST, res, err);
    }
};


export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = refreshTokenSchema.parse(req.body);

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, JWTRefreshSecret);
        } catch (err) {
            return error("Invalid or expired refresh token. Please login again.", StatusCodes.UNAUTHORIZED, res);
        }

        const user = await userModel.findById(decoded.id);
        if (!user || !user.refreshToken) {
            return error("Refresh token not found. Please login again.", StatusCodes.UNAUTHORIZED, res);
        }

        const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isValid) {
            return error("Invalid refresh token. Please login again.", StatusCodes.UNAUTHORIZED, res);
        }

        const newAccessToken = jwt.sign(
            { id: user._id, role: user.role },
            JWTSecret,
            { expiresIn: JWTExpiresIn }
        );

        return success(
            "Token refreshed successfully",
            { _token: newAccessToken },
            StatusCodes.OK,
            res,
            5
        );
    } catch (err) {
        return exception(null, StatusCodes.BAD_REQUEST, res, err);
    }
};

export const logout = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.user.id, { refreshToken: null });

        return success(
            "Logged out successfully",
            {},
            StatusCodes.OK,
            res,
            6
        );
    } catch (err) {
        return exception(null, StatusCodes.INTERNAL_SERVER_ERROR, res, err);
    }
};