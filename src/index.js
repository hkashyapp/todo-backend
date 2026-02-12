import path from "path";
import express, { json, urlencoded } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { port, nodeEnv } from "./config/index.js";
import connectDB from "./config/conn.js";
import Api from "./routes/indexRoute.js";
import { globalLimiter } from "./middlewares/rateLimiter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

connectDB();

app.use(helmet());

const corsOptions = {
    origin: nodeEnv === "production"
        ? (process.env.CORS_ORIGIN || "https://yourdomain.com")
        : "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(globalLimiter);

app.use(json({ limit: "100mb" }));
app.use(urlencoded({ extended: false, limit: "100mb" }));
app.use(cookieParser());

app.use(
    logger("dev", {
        skip: (req, res) => req.originalUrl.includes("/static/"),
    })
);

app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

app.use("/api/v1", Api);

// Serve frontend
const publicDir = join(__dirname, "../public");
app.use(express.static(publicDir));

app.listen(port, () => console.log(`Server running at port ${port}...`));