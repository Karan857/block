import express from "express";
import { register, login, get, edit } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth", get);
router.put("/auth", edit);

export default router;
