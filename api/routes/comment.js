import express from "express";
import { addComment, getComment } from "../controllers/comment.js";

const router = express.Router();

router.post("/comment", addComment);
router.get("/comment", getComment);

export default router;
