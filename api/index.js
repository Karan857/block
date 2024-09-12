import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import postRoute from "./routes/post.js";
import authRoute from "./routes/auth.js";
import likeRoute from "./routes/like.js";
import commentRoute from "./routes/comment.js";

app.use("/api", postRoute);
app.use("/api", authRoute);
app.use("/api", likeRoute);
app.use("/api", commentRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => console.log(`Server running on port ${port}`));
