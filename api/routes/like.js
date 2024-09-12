import express from "express";
import { like, getLike } from "../controllers/like.js";

const router = express.Router();

router.post("/like", like);
router.get("/likes", getLike);

export default router;
