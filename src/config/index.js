import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 5000;
export const JWTSecret = process.env.JWT_SECRET || 'your_default_secret';
export const mongoURI = process.env.MONGO_URI;
export const nodeEnv = process.env.NODE_ENV || 'development';