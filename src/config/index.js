import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 5000;
export const mongoURI = process.env.MONGO_URI;
export const nodeEnv = process.env.NODE_ENV || 'development';

export const JWTSecret = process.env.JWT_SECRET || 'your_default_secret';
export const JWTRefreshSecret = process.env.JWT_REFRESH_SECRET || 'your_default_refresh_secret';
export const JWTExpiresIn = process.env.JWT_EXPIRES_IN || '15m';
export const JWTRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';