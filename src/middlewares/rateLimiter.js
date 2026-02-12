import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: true,
        message: "Too many requests. Please try again later.",
        code: 0,
    },
});


export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: true,
        message: "Too many authentication attempts. Please try again later.",
        code: 0,
    },
});
