import path from "path";
import express, { json, urlencoded } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { port } from "./config/index.js";
import connectDB from "./config/conn.js";
import Api from "./routes/indexRoute.js";

// Setup __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Database Connection
connectDB();

app.use(json({ limit: "100mb" }));
app.use(urlencoded({ extended: false, limit: "100mb" }));
app.use(cookieParser());
app.use(cors());

app.use(
    logger("dev", {
        skip: (req, res) => req.originalUrl.includes("/static/"),
    })
);

// Static file routes
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

// Versioned API Routes
app.use("/api/v1", Api);

// Serve frontend
const publicDir = join(__dirname, "../public");
app.use(express.static(publicDir));

// app.get("*", (req, res) => {
//     // Check if file exists before sending to avoid errors
//     res.sendFile("index.html", { root: publicDir }, (err) => {
//         if (err) {
//             res.status(200).send("API is running. Frontend build not found.");
//         }
//     });
// });

app.listen(port, () => console.log(`Server running at port ${port}...`));